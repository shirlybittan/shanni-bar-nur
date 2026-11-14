import json
from playwright.sync_api import sync_playwright
axe=open('node_modules/axe-core/axe.min.js').read()
R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    # functional, mobile
    pg=b.new_page(viewport={'width':375,'height':812})
    pg.goto('http://localhost:8765/'); pg.wait_for_load_state('networkidle')
    pg.click('.menu-toggle'); R['menu_open']=pg.get_attribute('.menu-toggle','aria-expanded')
    pg.keyboard.press('Escape'); R['menu_esc']=pg.get_attribute('.menu-toggle','aria-expanded')
    pg.click('#services .service:nth-child(3) summary'); R['details_open']=pg.eval_on_selector('#services .service:nth-child(3) details','d=>d.open')
    pg.click('#services .service:nth-child(3) .interest-link'); pg.wait_for_timeout(900)
    R['prefill']=pg.input_value('#interest'); R['focused']=pg.evaluate('document.activeElement.id')
    pg.click('.form-submit'); R['errors']=pg.inner_text('#form-status'); R['first_invalid_focus']=pg.evaluate('document.activeElement.id')
    pg.fill('#name','בדיקה'); pg.fill('#phone','050-1234567'); pg.check('#consent'); pg.click('.form-submit'); R['ok']=pg.inner_text('#form-status')
    R['tel']=pg.get_attribute('.contact-phone','href')
    R['h_scroll_after_open']=pg.evaluate('document.documentElement.scrollWidth>innerWidth')
    # keyboard order
    pg.goto('http://localhost:8765/'); seq=[]
    for i in range(7): pg.keyboard.press('Tab'); seq.append(pg.evaluate("(document.activeElement.textContent||document.activeElement.getAttribute('aria-label')||'').trim().slice(0,22)"))
    R['tab_order']=seq
    # axe desktop
    pg=b.new_page(viewport={'width':1440,'height':900}); pg.goto('http://localhost:8765/'); pg.wait_for_load_state('networkidle')
    pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'))"); pg.wait_for_timeout(1100)
    pg.add_script_tag(content=axe)
    res=pg.evaluate("async()=>{const r=await axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa']});return r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,t:v.nodes.slice(0,3).map(x=>x.target.join(' ')+' | '+(x.any[0]?.message||'').slice(0,120))}))}")
    R['axe']=res
    # video wiring
    for rm in ['no-preference','reduce']:
        c=b.new_context(viewport={'width':1440,'height':900},reduced_motion=rm); v=c.new_page(); v.goto('http://localhost:8766/'); v.wait_for_timeout(2000)
        R['video_'+rm]=v.evaluate("({video:!!document.querySelector('.hero-video'),playing:document.querySelector('.hero-arch').classList.contains('is-playing'),archH:document.querySelector('.hero-arch').getBoundingClientRect().height})"); c.close()
    b.close()
print(json.dumps(R,ensure_ascii=False,indent=1))
