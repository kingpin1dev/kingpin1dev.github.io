/* Loaded inside the app demos that run in an iframe on kingpindev.com: hide the system
   cursor and report pointer moves, so the page's custom cursor follows into the frame. */
(function () {
  if (window.parent === window) return;
  const st = document.createElement('style');
  st.textContent = '*{cursor:none!important}';
  (document.head || document.documentElement).appendChild(st);
  addEventListener('mousemove', (e) => {
    window.parent.postMessage({ kpd: 'mm', x: e.clientX, y: e.clientY }, location.origin);
  }, { passive: true });
})();
