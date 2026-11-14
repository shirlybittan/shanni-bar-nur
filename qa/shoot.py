import sys, json
from playwright.sync_api import sync_playwright
import os; URL=os.environ.get('URL','http://localhost:8765/')
sizes={'mobile':(375,812),'tablet':(768,1024),'desktop':(1440,900)}
out={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,(w,h) in sizes.items():
        for rm in ['no-preference','reduce']:
            ctx=b.new_context(viewport={'width':w,'height':h},reduced_motion=rm,device_scale_factor=1)
            pg=ctx.new_page(); errs=[]
            pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('pageerror',lambda e: errs.append(str(e)))
            pg.goto(URL); pg.wait_for_load_state('networkidle'); pg.evaluate('document.fonts.ready')
            if rm=='no-preference':
                # reveal everything for a full-page shot
                pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'))"); pg.wait_for_timeout(1100)
                pg.screenshot(path=f'after-{name}-full.png',full_page=True)
                pg.screenshot(path=f'after-{name}-fold.png')
            info=pg.evaluate("""()=>({hscroll:document.documentElement.scrollWidth>innerWidth, sw:document.documentElement.scrollWidth,
              hidden:[...document.querySelectorAll('.reveal')].filter(e=>getComputedStyle(e).opacity<0.5).length,
              hasReveal:document.documentElement.classList.contains('has-reveal'),
              ctaInFold:(()=>{const r=document.querySelector('.hero .button.primary').getBoundingClientRect();return r.bottom<=innerHeight})(),
              fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+f.weight)})""")
            info['errors']=errs; out[f'{name}-{rm}']=info; ctx.close()
    b.close()
print(json.dumps(out,ensure_ascii=False,indent=1))
