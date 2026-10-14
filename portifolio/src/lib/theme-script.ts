/**
 * Roda no <head>, antes da pintura, para aplicar o tema salvo (ou o do sistema)
 * sem piscar o tema errado.
 */
export const temaInicialScript = `(function(){try{var t=localStorage.getItem('tema');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;
