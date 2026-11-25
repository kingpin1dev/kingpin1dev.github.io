
(() => {
  chrome.runtime.setUninstallURL('').catch(console.warn)
  const t = globalThis.klasText.t;
  const key = 'klasBookmarkCategories';
  const cardKey = 'klasBookmarkCards';
  function readDockStorage() {
    return chrome.storage.local.get([key, cardKey]);
  }
  const defaults = ['Social', 'Business', 'Diğer', 'Araçlar'].map((name, i) => ({ id: String(i), name, links: [] }));
  const host = document.createElement('div');
  host.id = 'klas-personal-bookmark-dock';
  const root = host.attachShadow({ mode: 'open' });
  const icons = {
    "check": "m5 12 4 4L19 6",
    "mirror": "M9 9h10v11H9zM15 9V4H5v11h4",
    "move": "M12 3v18M3 12h18M9 6l3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3",
    "bookmark": "M6 5.5A1.5 1.5 0 0 1 7.5 4h9A1.5 1.5 0 0 1 18 5.5V20l-6-4-6 4Z",
    "pencil": "m4 20 4.5-1 11-11a1.8 1.8 0 0 0 0-2.5l-1-1a1.8 1.8 0 0 0-2.5 0l-11 11L4 20Zm10-13 3 3",
    "close": "m7 7 10 10M17 7 7 17",
    "plus": "M12 5v14M5 12h14",
    "folderPlus": "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9 3v6m-3-3h6",
    "trash": "M4 7h16m-10 4v6m4-6v6M9 7V4h6v3M6 7l1 13h10l1-13"
  };
  const icon = (name) => `<svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg>`;
  root.innerHTML = `
    <link rel="stylesheet" href="${chrome.runtime.getURL('src/styles/bookmark-dock.css')}">
    <section aria-label="Yer imi kartları" data-klas-label="Bookmark cards">
      <div class="toolbar">
        <button class="show-picker pill" type="button" aria-expanded="false" aria-controls="bookmark-picker">
          ${icon("bookmark")}<span data-klas-text="Chrome bookmarks">Chrome yer imleri</span>
        </button>
        <button class="pill add-category" type="button" hidden><span data-klas-text="New category">Yeni kategori</span></button>
        <button class="pill add-card" type="button" hidden><span data-klas-text="Add glass card">Cam kart ekle</span></button>
        <button class="pill add-mirror" type="button" aria-expanded="false" aria-controls="add-card-options" hidden><span data-klas-text="Add mirrored card">Ayna kart ekle</span></button>
        <button class="icon edit-mode" type="button" aria-label="Kartları düzenle" data-klas-label="Edit cards" title="Kartları düzenle" data-klas-title="Edit cards" aria-pressed="false"></button>
      </div>
      <div id="add-card-options" class="add-card-options" aria-label="Yeni cam kartın kategorisi" data-klas-label="Category for the new card" hidden></div>
      <div class="cards"></div>
      <p class="status" role="status" hidden></p>
      <div id="bookmark-picker" class="picker" hidden>
        <div class="picker-controls">
          <label><span data-klas-text="Search bookmarks">Yer imi ara</span> <input type="search" placeholder="Ad, klasör veya adres" data-klas-placeholder="Name, folder, or address"></label>
          <div class="picker-target"><div class="editor-label"><span data-klas-text="Target category">Hedef kategori</span></div><details class="category-choices"><summary><span data-klas-text="Choose a category">Kategori seç</span></summary></details></div>
        </div>
        <div class="results"></div>
      </div>
    </section>`;
  const find = (selector) => root.querySelector(selector);
  const cards = find('.cards');
  const picker = find('.picker');
  const pickerButton = find('.show-picker');
  const editButton = find('.edit-mode');
  const addCategory = find('.add-category');
  const addCard = find('.add-card');
  const addMirror = find('.add-mirror');
  const addCardOptions = find('.add-card-options');
  addCategory.insertAdjacentHTML('afterbegin', icon('folderPlus'));
  addCard.insertAdjacentHTML('afterbegin', icon('plus'));
  addMirror.insertAdjacentHTML('afterbegin', icon('mirror'));
  editButton.innerHTML = icon('pencil');
  const search = find('input');
  const targetChoices = find('.picker-target details');
  const targetSummary = targetChoices.querySelector('summary');
  let targetCategory = '';
  const results = find('.results');
  const status = find('.status');
  let state = defaults;
  let cardCategories;
  let bookmarks = [];
  let bookmarkTitles = new Map();
  let titlesByPath = new Map();
  let titlesByHost = new Map();
  let editing = false;
  let closingEdit = false;
  let closingPicker = false;
  let closingAddCard = false;
  let dismissEditor = () => {};
  let cardDrag;
  let rowDrag;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let pickerMessage = '';
  let ready = false;

  function notice(message = '') {
    status.textContent = message;
    status.hidden = !message;
  }

  function categoryName(group) {
    if (!group) return t("Choose a category");
    const index = defaults.findIndex((item) => item.id === group.id && item.name === group.name);
    return index < 0 ? group.name : t(["Social", "Business", "Other", "Tools"][index]);
  }

  function categoriesForCards(groups, saved) {
    const slots = Array.isArray(saved) ? saved : Array.from({ length: 4 }, (_, index) => groups[index]?.id);
    return slots.map((id) => groups.some((group) => group.id === id) ? id : null);
  }

  function element(tag, className, content) {
    const item = document.createElement(tag);
    item.className = className;
    if (content !== undefined) item.textContent = content;
    return item;
  }

  function button(symbol, description, action) {
    const item = element('button', 'icon');
    item.dataset.icon = symbol;
    item.innerHTML = icon(symbol);
    item.type = 'button';
    item.title = description;
    item.setAttribute('aria-label', description);
    item.addEventListener('click', action);
    return item;
  }

  function safeUrl(raw) {
    try {
      const url = new URL(raw);
      return ['https:', 'http:', 'ftp:'].includes(url.protocol) ? url.href : '';
    } catch {
      return '';
    }
  }

  function manualUrl(value) {
    if (!value || /\s/.test(value)) return '';
    const absolute = safeUrl(value);
    if (absolute) return absolute;
    if (value.includes('://') || value.startsWith('/')) return '';
    try {
      const address = new URL('https://' + value);
      const host = address.hostname;
      if (address.username || address.password) return '';
      return host.includes('.') || host === 'localhost' || host.startsWith('[') ? address.href : '';
    } catch {
      return '';
    }
  }


  function titleKey(url) {
    const address = new URL(url);
    const host = address.host.toLowerCase().replace(/^www\./, '');
    const path = address.pathname.replace(/\/+$/, '');
    return { host, path: host + path };
  }

  function storedBookmarkTitle(url) {
    const { path } = titleKey(url);
    return bookmarkTitles.get(url) || titlesByPath.get(path);
  }

  function bookmarkTitle(link) {
    if (link.customTitle) return link.customTitle;
    const title = link.title?.trim();
    const { host } = titleKey(link.url);
    return storedBookmarkTitle(link.url) || (title && !safeUrl(title) ? title : titlesByHost.get(host) || host);
  }

  function favicon(link) {
    const image = element('img', 'site-icon');
    const src = new URL(chrome.runtime.getURL('/_favicon/'));
    src.searchParams.set('pageUrl', link.url);
    src.searchParams.set('size', '32');
    image.alt = '';
    image.draggable = false;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.replaceWith(element('span', 'site-icon monogram', bookmarkTitle(link).charAt(0).toLocaleUpperCase('tr')));
    }, { once: true });
    image.src = src.href;
    return image;
  }

  async function update(change) {
    if (!ready) return;
    try {
      return await navigator.locks.request(key, async () => {
        const stored = await readDockStorage();
        const next = stored[key] ?? structuredClone(defaults);
        const slots = categoriesForCards(next, stored[cardKey]);
        const message = change(next, slots);
        if (message) return notice(message);
        await chrome.storage.local.set({ [key]: next, [cardKey]: slots });
        cardCategories = slots;
        state = next;
        render();
        notice();
        return true;
      });
    } catch {
      notice(t("Could not save the change. Try again."));
    }
  }

  function placeLink(categoryId, data, beforeId, sourceId) {
    return update((next) => {
      const group = next.find((item) => item.id === categoryId);
      if (!group) return t("Target category not found.");
      if (beforeId && data.id === beforeId) return;
      const source = next.find((item) => item.id === sourceId);
      const existing = source?.links.find((item) => item.id === data.id);
      if (sourceId && !existing) return t("This link is no longer in this category.");
      const url = safeUrl((existing ?? data).url);
      if (!url) return t("This link address is unsupported.");
      if (group.links.some((item) => item.url === url && item.id !== existing?.id)) {
        return t("This link is already in the category.");
      }
      const link = existing ?? { id: crypto.randomUUID(), url, title: storedBookmarkTitle(url) || data.title?.trim() || '' };
      if (!existing && typeof data.customTitle === 'string' && data.customTitle.trim()) link.customTitle = data.customTitle.trim();
      if (existing) source.links = source.links.filter((item) => item.id !== existing.id);
      const index = group.links.findIndex((item) => item.id === beforeId);
      group.links.splice(index < 0 ? group.links.length : index, 0, link);
    });
  }

  const dragType = 'application/x-klas-dock-bookmark';
  function startDrag(event, link, sourceId) {
    event.dataTransfer.setData(dragType, JSON.stringify({ link, sourceId }));
    event.dataTransfer.setData('text/uri-list', link.url);
    event.dataTransfer.effectAllowed = sourceId ? 'move' : 'copy';
  }

  function animateMoved(nodes, before, animationId, duration, excluded) {
    if (reducedMotion.matches) return;
    nodes.forEach((node, index) => {
      node.getAnimations().filter((animation) => animation.id === animationId).forEach((animation) => animation.cancel());
      if (node === excluded) return;
      const current = node.getBoundingClientRect();
      const left = before[index].left - current.left;
      const top = before[index].top - current.top;
      if (!left && !top) return;
      const animation = node.animate([
        { transform: 'translate(' + left + 'px,' + top + 'px)' },
        { transform: 'translate(0,0)' }
      ], { duration, easing: 'cubic-bezier(.22,.8,.25,1)' });
      animation.id = animationId;
    });
  }

  function clearRowDrag() {
    rowDrag?.row.classList.remove('row-dragging');
    rowDrag = null;
  }

  function previewRowOrder(card, event) {
    const drag = rowDrag;
    if (!drag || drag.committing || drag.card !== card || !event.dataTransfer.types.includes(dragType)) return false;
    const y = event.clientY - card.getBoundingClientRect().top - card.clientTop;
    const nodes = Array.from(card.querySelectorAll(':scope > .bookmark'));
    const next = nodes.find((node) => node !== drag.row && y < node.offsetTop + node.offsetHeight / 2) ?? null;
    if ((drag.row.nextElementSibling ?? null) !== next) {
      const previous = nodes.map((node) => node.getBoundingClientRect());
      if (card.moveBefore) card.moveBefore(drag.row, next);
      else card.insertBefore(drag.row, next);
      drag.previewed = true;
      animateMoved(nodes, previous, 'bookmark-reorder', 280, drag.row);
    }
    return true;
  }


  function registerDrop(zone, categoryId, beforeId) {
    zone.addEventListener('dragover', (event) => {
      if (![dragType, 'text/uri-list', 'text/plain'].some((type) => event.dataTransfer.types.includes(type))) return;
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = event.dataTransfer.effectAllowed === 'move' ? 'move' : 'copy';
      const card = zone.closest('.category');
      if (!previewRowOrder(card, event)) zone.classList.add('drop');
    });
    zone.addEventListener('dragleave', (event) => {
      if (!zone.contains(event.relatedTarget)) zone.classList.remove('drop');
    });
    zone.addEventListener('drop', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      root.querySelectorAll('.drop').forEach((item) => item.classList.remove('drop'));
      const payload = event.dataTransfer.getData(dragType);
      if (payload) {
        try {
          const { link, sourceId } = JSON.parse(payload);
          if (!link?.url) return;
          const drag = rowDrag;
          const preview = drag?.previewed && drag.card === zone.closest('.category');
          if (drag) drag.committing = true;
          const destination = preview ? drag.row.nextElementSibling?.dataset.linkId : beforeId;
          const saved = await placeLink(categoryId, link, destination, sourceId);
          if (rowDrag === drag) clearRowDrag();
          if (drag?.previewed && !saved) render();
        } catch {
          notice(t("Could not read the dropped link."));
        }
        return;
      }
      const entries = event.dataTransfer.getData('text/uri-list').split(/\r?\n/);
      const url = entries.find((line) => line.trim() && !line.startsWith('#'))
        || event.dataTransfer.getData('text/plain').trim();
      let title = '';
      const html = event.dataTransfer.getData('text/html');
      if (html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        title = template.content.querySelector('a')?.textContent.trim() ?? '';
      }
      placeLink(categoryId, { url, title }, beforeId);
    });
  }

  function openEditor(container, labelText, value, save, { required = true, showCardOption = false, inline = false, showUrl = false, urlValue = '' } = {}) {
    dismissEditor();
    const form = element('form', 'name-editor');
    if (inline) form.classList.add('heading-editor');
    if (showUrl) form.classList.add('link-editor');
    form.noValidate = true;
    const input = element('input', '');
    input.type = 'text';
    input.value = value;
    input.required = required;
    input.setAttribute('aria-label', labelText);
    const previous = inline ? Array.from(container.childNodes) : [];
    const trigger = root.activeElement;
    function dismiss(restoreFocus = false) {
      if (inline && form.parentElement === container) container.replaceChildren(...previous);
      else form.remove();
      dismissEditor = () => {};
      if (restoreFocus) trigger?.focus();
    }
    dismissEditor = dismiss;
    let urlInput;
    if (showUrl) {
      const urlLabel = element('label', '', t("Link address"));
      urlInput = element('input', 'link-url');
      urlInput.type = 'text';
      urlInput.inputMode = 'url';
      urlInput.placeholder = t("example.com");
      urlInput.value = urlValue;
      urlInput.required = true;
      urlInput.autocomplete = 'off';

      urlLabel.append(urlInput);
      form.append(urlLabel);
    }
    const actions = element('div', 'card-actions');
    const submit = inline ? button('check', t("Save"), () => {}) : element('button', 'pill', t("Save"));
    submit.type = 'submit';
    if (!inline) submit.insertAdjacentHTML('afterbegin', icon('check'));
    const cancelEditor = async () => {
      await collapse([form], inline);
      if (dismissEditor === dismiss) dismiss(true);
    };
    const cancel = inline ? button('close', t("Cancel"), cancelEditor) : element('button', 'pill', t("Cancel"));
    cancel.type = 'button';
    if (!inline) cancel.classList.add('editor-cancel');
    if (!inline) cancel.addEventListener('click', cancelEditor);
    actions.append(submit, cancel);
    if (inline) form.append(input);
    else {
      const label = element('label', '', labelText);
      label.append(input);
      form.append(label);
    }
    const checkbox = element('input', '');
    if (showCardOption) {
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      const cardOption = element('label', 'new-card-option');
      cardOption.append(checkbox, t("Show on a new glass card"));
      form.append(cardOption);
    }
    const error = element('p', 'editor-error');
    error.setAttribute('role', 'status');
    error.hidden = true;
    form.append(error, actions);
    form.addEventListener('input', (event) => {
      event.target.removeAttribute('aria-invalid');
      error.hidden = true;
    });
    function invalid(field, message) {
      field.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      error.hidden = false;
      field.focus();
    }
    form.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        cancelEditor();
      }
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = input.value.trim();
      if (required && !name) return invalid(input, t("Enter a name."));
      const url = urlInput ? manualUrl(urlInput.value.trim()) : '';
      if (urlInput && !url) {
        return invalid(urlInput, t("Enter a valid web address."));
      }
      submit.disabled = true;
      await collapse([form], inline);
      if (dismissEditor !== dismiss) return;
      form.hidden = true;
      const saved = await save(name, checkbox.checked, url);
      if (dismissEditor === dismiss) {
        if (saved) dismiss();
        else form.hidden = false;
      }
      submit.disabled = false;
    });
    if (inline) container.replaceChildren(form);
    else container.after(form);
    if (inline) reveal([form]);
    else expand([form]);
    const firstInput = urlInput ?? input;
    firstInput.focus();
    firstInput.select();
  }


  function nextUnnamedCategory(groups) {
    const names = new Set(groups.map(({ name }) => name.trim().toLocaleLowerCase(document.documentElement.lang.replaceAll('_', '-') || 'en')));
    let name = t("Untitled category");
    for (let number = 1; names.has(name.toLocaleLowerCase(document.documentElement.lang.replaceAll('_', '-') || 'en')); number++) {
      name = t("Untitled category ({number})", { number });
    }
    return name;
  }

  async function saveCategory(id, name, createCard = false) {
    const saved = await update((next, slots) => {
      const current = next.find((item) => item.id === id);
      if (id && !current) return t("Category not found.");
      if (current) current.name = name;
      else {
        const newId = crypto.randomUUID();
        next.push({ id: newId, name: name ?? nextUnnamedCategory(next), links: [] });
        if (createCard) slots.push(newId);
      }
    });
    if (saved && createCard) reveal([cards.lastElementChild]);
    return saved;
  }

  function saveLink(group, link, title, url) {
    return update((next) => {
      const currentGroup = next.find((item) => item.id === group.id);
      const current = currentGroup?.links.find((item) => item.id === link.id);
      if (!current) return t("No bookmarks found.");
      if (currentGroup.links.some((item) => item.id !== link.id && item.url === url)) {
        return t("This link is already in the category.");
      }
      if (current.url !== url) {
        current.url = url;
        current.title = storedBookmarkTitle(url) || '';
      }
      if (title) current.customTitle = title;
      else delete current.customTitle;
    });
  }

  function categoryOptions(selectCategory, groups = state, selectedId) {
    const list = element('div', 'category-options');
    for (const category of groups) {
      const choice = element('button', 'category-choice', categoryName(category));
      choice.type = 'button';
      choice.dataset.category = category.id;
      if (selectedId) choice.setAttribute('aria-pressed', String(category.id === selectedId));
      choice.addEventListener('click', () => selectCategory(category.id));
      list.append(choice);
    }
    if (!groups.length) list.append(element('p', 'empty', t("Create a category first.")));
    return list;
  }


  function confirmCategoryRemoval(settings, group) {
    dismissEditor();
    const panel = element('div', 'name-editor delete-confirm');
    const trigger = root.activeElement;
    const actions = element('div', 'card-actions');
    const cancel = element('button', 'pill editor-cancel', t("Cancel"));
    const remove = element('button', 'pill danger', t("Delete category"));
    cancel.type = remove.type = 'button';
    function dismiss() {
      panel.remove();
      dismissEditor = () => {};
      trigger?.focus();
    }
    dismissEditor = dismiss;
    cancel.addEventListener('click', async () => {
      await collapse([panel]);
      if (dismissEditor === dismiss) dismiss();
    });
    remove.addEventListener('click', async () => {
      remove.disabled = true;
      await collapse([panel]);
      if (dismissEditor !== dismiss) return;
      panel.hidden = true;
      const saved = await update((next, slots) => {
        const index = next.findIndex((item) => item.id === group.id);
        if (index >= 0) next.splice(index, 1);
        for (let index = slots.length - 1; index >= 0; index--) {
          if (slots[index] === group.id) slots.splice(index, 1);
        }
      });
      if (dismissEditor !== dismiss) return;
      if (saved) dismiss();
      else {
        panel.hidden = false;
        remove.disabled = false;
      }
    });
    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') cancel.click();
    });
    actions.append(cancel, remove);
    panel.append(element('p', 'editor-label', t("Delete “{name}” and its links from all cards?", { name: categoryName(group) })), actions);
    settings.after(panel);
    expand([panel]);
    cancel.focus();
  }


  function cardSettings(slot, group) {
    const settings = element('div', 'card-settings');
    if (!group) {
      const choices = element('details', 'category-choices');
      choices.append(element('summary', '', t("Choose a category")));
      const list = categoryOptions(async (id) => {
        await closeCategoryChoices(choices);
        update((next, slots) => {
          if (slot >= slots.length || slots[slot] !== null) return t("The card changed. Try again.");
          if (!next.some((category) => category.id === id)) return t("Category not found.");
          slots[slot] = id;
        });
      });
      choices.append(list);
      choices.addEventListener('toggle', () => { if (choices.open) expand([list]); });
      choices.querySelector('summary').addEventListener('click', (event) => {
        if (choices.open) {
          event.preventDefault();
          closeCategoryChoices(choices);
        }
      });
      settings.append(choices);
    }
    const remove = element('button', 'quiet-button', t("Remove card"));
    remove.type = 'button';
    remove.addEventListener('click', () => update((next, slots) => {
      if (slot >= slots.length || slots[slot] !== (group?.id ?? null)) return t("The card changed. Try again.");
      slots.splice(slot, 1);
    }));
    settings.append(remove);
    if (group) {
      const addLink = button('plus', t("Add link"), () => {
        openEditor(settings, t("Link name (optional)"), '', (name, _showCard, url) =>
          placeLink(group.id, { url, customTitle: name }), { required: false, showUrl: true });
      });
      addLink.classList.add('pill', 'add-link');
      addLink.append(element('span', '', t("Add link")));
      settings.prepend(addLink);
      const deleteCategory = element('button', 'quiet-button danger', t("Delete category"));
      deleteCategory.type = 'button';
      deleteCategory.addEventListener('click', () => confirmCategoryRemoval(settings, group));
      settings.append(deleteCategory);
    }
    return settings;
  }


  function renderCard(id, slot) {
    const group = state.find((item) => item.id === id);
    const card = element('article', 'category');
    const heading = element('header', 'category-head');
    if (editing) heading.classList.add('draggable-heading');
    const name = element('h2', '', categoryName(group));
    card.setAttribute('aria-label', name.textContent);
    heading.append(name);
    if (editing && group) {
      const rename = button('pencil', t("Rename the “{name}” category", { name: categoryName(group) }), () => {
        openEditor(heading, t("Category name"), categoryName(group), (title) =>
          saveCategory(group.id, title === categoryName(group) ? group.name : title), { inline: true });
      });
      rename.classList.add('rename-category');
      heading.append(rename);
    }
    if (editing) {
      const handle = button('move', t("Move card"), () => {});
      handle.classList.add('move-card');
      handle.title = t("Drag or use the arrow keys");
      handle.addEventListener('keydown', async (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        const slots = categoriesForCards(state, cardCategories);
        const to = slot + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1);
        if (to < 0 || to >= slots.length) return;
        if (await reorderSlots(slot, to, slots)) cardNodes()[to]?.querySelector('.move-card')?.focus();
      });
      heading.append(handle);
    }
    card.append(heading);
    if (editing) card.append(cardSettings(slot, group));
    if (!group) return card;
    registerDrop(card, group.id);
    if (!group.links.length) card.append(element('p', 'empty', t("Drop a bookmark here")));
    for (const link of group.links) {
      const row = element('div', 'bookmark');
      row.dataset.linkId = link.id;
      const title = bookmarkTitle(link);
      const anchor = element('a', '');
      anchor.append(favicon(link), element('span', 'bookmark-name', title));
      anchor.href = link.url;
      anchor.title = title;
      row.draggable = true;
      row.addEventListener('dragstart', (event) => {
        if (event.target.closest('button')) {
          event.preventDefault();
          return;
        }
        dismissEditor();
        clearRowDrag();
        rowDrag = { row, card, previewed: false, committing: false };
        startDrag(event, link, group.id);
        row.classList.add('row-dragging');
      });
      row.addEventListener('dragend', () => {
        if (rowDrag?.row !== row || rowDrag.committing) return;
        const previewed = rowDrag.previewed;
        clearRowDrag();
        if (previewed) render();
      });
      row.append(anchor);
      if (editing) row.append(
        button('pencil', t("Edit the “{name}” link", { name: title }), () => {
          openEditor(row, t("Link name (optional)"), title, (name, _showCard, url) =>
            saveLink(group, link, name, url), { required: false, showUrl: true, urlValue: link.url });
        }),
        button('trash', t("Remove the “{name}” link from the cards", { name: title }), () => {
          update((next) => {
            const current = next.find((item) => item.id === group.id);
            if (current) current.links = current.links.filter((item) => item.id !== link.id);
          });
        })
      );
      registerDrop(row, group.id, link.id);
      card.append(row);
    }
    return card;
  }

  function render() {
    clearCardDrag();
    clearRowDrag();
    const slots = categoriesForCards(state, cardCategories);
    host.style.setProperty('--cards-width', Math.min(1500, 900 + Math.max(0, slots.length - 4) * 175) + 'px');
    cards.replaceChildren(...slots.map(renderCard));
    const available = state.filter((group) => slots.includes(group.id));
    if (!available.some((group) => group.id === targetCategory)) targetCategory = available[0]?.id ?? '';
    targetSummary.textContent = categoryName(available.find((group) => group.id === targetCategory));
    targetChoices.querySelector('.category-options')?.remove();
    targetChoices.append(categoryOptions(async (id) => {
      await closeCategoryChoices(targetChoices);
      targetCategory = id;
      render();
      targetSummary.focus();
    }, available, targetCategory));
    if (!addCardOptions.hidden && !closingAddCard) renderAddCardOptions();
    if (!picker.hidden) renderBookmarks();
  }

  function collectBookmarks(nodes, path = []) {
    return nodes.flatMap((node) => {
      if (node.url) {
        const url = safeUrl(node.url);
        return url ? [{ url, title: node.title || url, path: path.join(' › ') }] : [];
      }
      return collectBookmarks(node.children ?? [], node.title ? [...path, node.title] : path);
    });
  }

  function indexTitle(index, key, title) {
    if (!index.has(key)) index.set(key, title);
    else if (index.get(key) !== title) index.set(key, null);
  }

  async function loadBookmarks() {
    bookmarks = collectBookmarks(await chrome.bookmarks.getTree());
    bookmarkTitles = new Map();
    titlesByPath = new Map();
    titlesByHost = new Map();
    for (const link of bookmarks) {
      const title = link.title.trim();
      if (!title || safeUrl(title)) continue;
      const { host, path } = titleKey(link.url);
      if (!bookmarkTitles.has(link.url)) bookmarkTitles.set(link.url, title);
      indexTitle(titlesByPath, path, title);
      indexTitle(titlesByHost, host, title);
    }
  }

  function renderBookmarks() {
    results.replaceChildren();
    if (pickerMessage) {
      results.append(element('p', 'empty', pickerMessage));
      return;
    }
    const query = search.value.trim().toLocaleLowerCase('tr');
    const matches = bookmarks.filter((item) => [item.title, item.url, item.path]
      .some((value) => value.toLocaleLowerCase('tr').includes(query)));
    for (const link of matches.slice(0, 100)) {
      const row = element('div', 'picker-row');
      const name = bookmarkTitle(link);
      const title = element('span', 'picker-label', name);
      title.title = link.url;
      if (link.path) title.append(element('small', '', link.path));
      const add = button('plus', t("Add the “{name}” link to the selected category", { name: name }),
        () => placeLink(targetCategory, link));
      add.disabled = !targetCategory;
      row.append(favicon(link), title, add);
      row.draggable = true;
      row.addEventListener('dragstart', (event) => startDrag(event, link));
      results.append(row);
    }
    if (!matches.length) results.append(element('p', 'empty', t("No bookmarks found.")));
    if (matches.length > 100) results.append(element('p', 'empty', t("Refine your search to see more bookmarks.")));
  }

  function reorderSlots(from, to, expected) {
    return update((next, slots) => {
      if (slots.length !== expected.length || slots.some((id, index) => id !== expected[index])) {
        return t("The card order changed. Try again.");
      }
      const [id] = slots.splice(from, 1);
      slots.splice(to, 0, id);
    });
  }

  function cardNodes() {
    return Array.from(cards.children).filter((node) => !node.classList.contains('drag-ghost'));
  }

  function positionGhost(event) {
    const { ghost, offsetX, offsetY } = cardDrag;
    const bounds = cards.getBoundingClientRect();
    ghost.style.transform = 'translate3d(' + (event.clientX - bounds.left - offsetX) + 'px,' +
      (event.clientY - bounds.top - offsetY) + 'px,0) scale(1.025)';
  }

  function clearCardDrag() {
    const drag = cardDrag;
    if (!drag) return;
    cardDrag = null;
    drag.card.classList.remove('card-placeholder');
    drag.ghost?.remove();
    if (cards.hasPointerCapture(drag.pointerId)) cards.releasePointerCapture(drag.pointerId);
  }

  cards.addEventListener('pointerdown', (event) => {
    if (!editing || !event.isPrimary || event.button !== 0 || cardDrag) return;
    const heading = event.target.closest('.draggable-heading');
    if (!heading || heading.querySelector('form')) return;
    const control = event.target.closest('button, input, textarea, select, a, form');
    if (control && !control.classList.contains('move-card')) return;
    const card = heading.closest('.category');
    const rect = card.getBoundingClientRect();
    const from = cardNodes().indexOf(card);
    cardDrag = {
      card, from, to: from, pointerId: event.pointerId, expected: categoriesForCards(state, cardCategories),
      x: event.clientX, y: event.clientY, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top
    };
    cards.setPointerCapture(event.pointerId);
  });

  cards.addEventListener('pointermove', (event) => {
    const drag = cardDrag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (!drag.ghost) {
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
      const ghost = drag.card.cloneNode(true);
      ghost.classList.add('drag-ghost');
      ghost.inert = true;
      ghost.setAttribute('aria-hidden', 'true');
      ghost.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
      ghost.style.width = drag.card.offsetWidth + 'px';
      drag.card.classList.add('card-placeholder');
      cards.append(ghost);
      drag.ghost = ghost;
    }
    positionGhost(event);
    const bounds = cards.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) return;
    const nodes = cardNodes();
    const destination = nodes.findIndex((card) =>
      x >= card.offsetLeft && x <= card.offsetLeft + card.offsetWidth &&
      y >= card.offsetTop && y <= card.offsetTop + card.offsetHeight);
    if (destination < 0 || destination === drag.to) return;
    const previous = nodes.map((card) => card.getBoundingClientRect());
    const target = nodes[destination];
    cards.insertBefore(drag.card, destination > drag.to ? target.nextSibling : target);
    drag.to = destination;
    animateMoved(nodes, previous, 'card-reorder', 350, drag.card);
  });

  async function finishCardDrag(event, commit) {
    const drag = cardDrag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    clearCardDrag();
    if (!drag.ghost) return;
    if (commit && drag.from !== drag.to && await reorderSlots(drag.from, drag.to, drag.expected)) return;
    render();
  }

  cards.addEventListener('pointerup', (event) => finishCardDrag(event, true));
  cards.addEventListener('pointercancel', (event) => finishCardDrag(event, false));
  cards.addEventListener('lostpointercapture', (event) => finishCardDrag(event, false));
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !cardDrag) return;
    event.preventDefault();
    clearCardDrag();
    render();
  });


  function expand(nodes, stagger = 0) {
    if (reducedMotion.matches) return;
    Array.from(nodes).forEach((node, index) => {
      const styles = getComputedStyle(node);
      const height = node.getBoundingClientRect().height;
      node.style.overflow = 'clip';
      const animation = node.animate([
        { height: '0px', opacity: 0, paddingBlock: '0px', marginBlock: '0px' },
        { height: height + 'px', opacity: 1, paddingBlock: styles.paddingBlock, marginBlock: styles.marginBlock }
      ], { duration: 330, delay: index * stagger, fill: 'backwards', easing: 'cubic-bezier(.22,.8,.25,1)' });
      animation.finished.catch(() => {}).finally(() => { node.style.overflow = ''; });
    });
  }


  async function collapse(nodes, inline = false) {
    if (reducedMotion.matches) return;
    const active = Array.from(nodes).filter((node) => node?.isConnected && !node.hidden);
    await Promise.all(active.map(async (node) => {
      const styles = getComputedStyle(node);
      const previousOverflow = node.style.overflow;
      node.style.overflow = 'clip';
      const frames = inline ? [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(.97)' }
      ] : [
        { height: styles.height, opacity: 1, paddingBlock: styles.paddingBlock, marginBlock: styles.marginBlock },
        { height: '0px', opacity: 0, paddingBlock: '0px', marginBlock: '0px' }
      ];
      const animation = node.animate(frames, { duration: 220, fill: 'forwards', easing: 'cubic-bezier(.4,0,.2,1)' });
      try {
        await animation.finished;
      } catch {
        // A render may replace the animated control.
      } finally {
        animation.cancel();
        node.style.overflow = previousOverflow;
      }
    }));
  }

  async function closeCategoryChoices(choices) {
    if (!choices.open || choices.dataset.closing) return;
    choices.dataset.closing = 'true';
    await collapse([choices.querySelector('.category-options')]);
    choices.open = false;
    delete choices.dataset.closing;
  }


  function reveal(nodes, stagger = 0) {
    if (reducedMotion.matches) return;
    Array.from(nodes).forEach((node, index) => node.animate([
      { opacity: 0, transform: 'translateY(9px) scale(.985)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 420, delay: index * stagger, fill: 'backwards', easing: 'cubic-bezier(.2,.8,.22,1.08)' }));
  }

  addCategory.addEventListener('click', async () => {
    await closeAddCardOptions();
    openEditor(addCategory.parentElement, t("New category name"), '', (name, createCard) => saveCategory(null, name, createCard), { showCardOption: true });
  });
  async function closeAddCardOptions() {
    if (addCardOptions.hidden || closingAddCard) return;
    closingAddCard = true;
    await collapse([addCardOptions]);
    addCardOptions.hidden = true;
    addMirror.setAttribute('aria-expanded', 'false');
    closingAddCard = false;
  }

  function renderAddCardOptions() {
    addCardOptions.replaceChildren(element('p', 'option-title', t("Category to mirror")), categoryOptions(async (id) => {
      if (closingAddCard) return;
      await closeAddCardOptions();
      const added = await update((next, slots) => {
        if (!next.some((category) => category.id === id)) return t("Category not found.");
        slots.push(id);
      });
      if (added) reveal([cards.lastElementChild]);
      addMirror.focus();
    }));
  }

  addCard.addEventListener('click', async () => {
    await closeAddCardOptions();
    dismissEditor();
    await saveCategory(null, null, true);
  });

  addMirror.addEventListener('click', () => {
    if (closingAddCard) return;
    if (!addCardOptions.hidden) {
      closeAddCardOptions();
      return;
    }
    dismissEditor();
    renderAddCardOptions();
    addCardOptions.hidden = false;
    addMirror.setAttribute('aria-expanded', 'true');
    expand([addCardOptions]);
  });
  editButton.addEventListener('click', async () => {
    if (closingEdit) return;
    if (editing) {
      closingEdit = true;
      await Promise.all([
        closeAddCardOptions(),
        collapse(cards.querySelectorAll('.card-settings')),
        collapse([addCategory, addCard, addMirror, ...root.querySelectorAll('.name-editor')], true)
      ]);
      closingEdit = false;
    }
    editing = !editing;
    addCategory.hidden = !editing;
    addCard.hidden = !editing;
    addMirror.hidden = !editing;
    if (!editing) dismissEditor();
    editButton.setAttribute('aria-pressed', String(editing));
    editButton.title = editing ? t("Finish editing") : t("Edit cards");
    editButton.setAttribute("aria-label", editButton.title);
    render();
    if (editing) {
      reveal([addCategory, addCard, addMirror], 40);
      expand(cards.querySelectorAll('.card-settings'), 32);
    }
  });

  targetSummary.addEventListener('click', (event) => {
    if (!targetChoices.open) return;
    event.preventDefault();
    closeCategoryChoices(targetChoices);
  });
  targetChoices.addEventListener('toggle', () => {
    if (targetChoices.open) expand([targetChoices.querySelector('.category-options')]);
  });
  search.addEventListener('input', renderBookmarks);
  pickerButton.addEventListener('click', async () => {
    if (closingPicker) return;
    if (!picker.hidden) {
      closingPicker = true;
      await collapse([picker]);
      picker.hidden = true;
      pickerButton.setAttribute('aria-expanded', 'false');
      closingPicker = false;
      return;
    }
    picker.hidden = false;
    pickerButton.setAttribute('aria-expanded', 'true');
    expand([picker]);
    pickerMessage = t("Loading bookmarks…");
    renderBookmarks();
    try {
      await loadBookmarks();
      pickerMessage = '';
    } catch {
      pickerMessage = t("Could not read Chrome bookmarks.");
    }
    render();
    if (!picker.hidden && root.activeElement === pickerButton) search.focus();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || (!changes[key] && !changes[cardKey])) return;
    if (changes[key]) state = changes[key].newValue ?? defaults;
    if (changes[cardKey]) cardCategories = changes[cardKey].newValue;
    render();
  });

  Promise.all([readDockStorage(), loadBookmarks().catch(() => {})]).then(([stored]) => {
    state = stored[key] ?? defaults;
    cardCategories = stored[cardKey];
    ready = true;
    render();
    reveal(cards.children, 65);
  }).catch(() => notice(t("Could not load bookmark cards. Reload the tab.")));
  function refreshBookmarkTitles() {
    loadBookmarks().then(render).catch(() => {});
  }

  chrome.bookmarks.onCreated.addListener(refreshBookmarkTitles);
  chrome.bookmarks.onChanged.addListener(refreshBookmarkTitles);
  chrome.bookmarks.onRemoved.addListener(refreshBookmarkTitles);
  globalThis.klasDockBackup = {
    async read() {
      const stored = await readDockStorage();
      const categories = stored[key] ?? defaults;
      return { version: 1, categories, cards: categoriesForCards(categories, stored[cardKey]) };
    },
    validate(backup) {
      if (backup?.version !== 1 || !Array.isArray(backup.categories) || !Array.isArray(backup.cards)) return false;
      const ids = new Set();
      for (const group of backup.categories) {
        if (!group || typeof group.id !== 'string' || !group.id || ids.has(group.id) ||
            typeof group.name !== 'string' || !group.name.trim() || !Array.isArray(group.links)) return false;
        ids.add(group.id);
        const links = new Set();
        for (const link of group.links) {
          if (!link || typeof link.id !== 'string' || !link.id || links.has(link.id) ||
              typeof link.url !== 'string' || !safeUrl(link.url) || typeof link.title !== 'string' ||
              (link.customTitle !== undefined && typeof link.customTitle !== 'string')) return false;
          links.add(link.id);
        }
      }
      return backup.cards.every((id) => id === null || ids.has(id));
    },
    async restore(backup) {
      await navigator.locks.request(key, () => chrome.storage.local.set({
        [key]: backup.categories,
        [cardKey]: backup.cards
      }));
    }
  };


  function updateLanguage() {
    globalThis.klasText.apply(root);
    editButton.title = t(editing ? 'Finish editing' : 'Edit cards');
    editButton.setAttribute('aria-label', editButton.title);
    notice();
    render();
  }
  globalThis.addEventListener('klas-language', updateLanguage);
  document.getElementById('interface').append(host);
  updateLanguage();
})();






