(() => {
  let language = 'en';
  let messages = {};
  function t(key, values = {}) {
    const template = messages['Lalune UI: ' + key] ?? key;
    return template.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(values, name) ? String(values[name]) : match);
  }
  function apply(scope) {
    for (const node of scope.querySelectorAll('[data-klas-text]')) node.textContent = t(node.dataset.klasText);
    for (const [source, attribute] of [['label', 'aria-label'], ['title', 'title'], ['placeholder', 'placeholder']]) {
      const key = 'data-klas-' + source;
      for (const node of scope.querySelectorAll('[' + key + ']')) node.setAttribute(attribute, t(node.getAttribute(key)));
    }
  }
  globalThis.klasText = {
    t,
    apply,
    setLanguage(next, dictionary = {}) {
      if (language === next && messages === dictionary) return;
      language = next;
      messages = dictionary;
      apply(document);
      globalThis.dispatchEvent(new Event('klas-language'));
    }
  };
  apply(document);
})();
