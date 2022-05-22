# draggable-scrollarea

Enable drag to scroll on any area with an overflow scroll.

![Short GIF animation that show a draggable image caroussel](https://i.imgur.com/93YiS9O.gif)

## Usage

You can load it from a CDN, with cdn version of library:

```html
<script src="https://cdn.jsdelivr.net/npm/draggable-scrollarea@1"></script>
<script>
    const draggableDiv = new DraggableScrollArea(document.querySelector('#draggable-div'));
</script>
```

Or you can import it via ES6 module:

```bash
npm i draggable-scrollarea
```

```js
import DraggableScrollArea from 'path/to/draggable-scrollarea';

const draggableDiv = new DraggableScrollArea(document.querySelector('#draggable-div'));
```

## Options

```ts
new DraggableScrollArea(element: HTMLElement);
```

## Methods

| Method                     | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `forwards(void)`           | Scroll forwards                                      |
| `backwards(void)`          | Scroll backwards                                     |
| `hideOnStart(HTMLElement)` | Hide an element when scrollarea is at start position |
| `hideOnEnd(HTMLElement)`   | Hide an element when scrollarea is at the end        |
|                            |                                                      |

## License

(c) 2022 Arno CELLARIER. Licensed under the MIT license.