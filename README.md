Makes an element follow you within the bounds of a container as you scroll.

## Usage
Activate follow-me.js using `$('#follow-me').follow()`.

```html
<div id="container" class="follow-container">
  <div id="follow-me" class="follow">
  </div>
</div>
```

```css
#follow-me {
  position: absolute;
}
```

```javascript
$('#follow-me').follow();
```

## Options
Pass in options like this:

```javascript
$('#follow-me').follow({
  container: 'my-container-name'
});
```

| Option          | Type    | Default     | Description                                             |
|-----------------|---------|-------------|---------------------------------------------------------|
| `container`     | String  | `container` | ID of the containing element.                           |
| `speed`         | Integer | `500`       | Animation speed in milliseconds.                        |
| `offset`        | Integer | `0`         | Offset from the top. Ignored if `offsetElement` is set. |
| `offsetElement` | String  | `null`      | If set, uses the height of this element as an offset.   |
| `min`           | Integer | `null`      | Minimum screen width to enable this plugin.             |
| `max`           | Integer | `null`      | Maximum screen width to enable this plugin.             |


## Events
Use events like this:

```javascript
$('#follow-me').follow({
  topStart: myFunction
});
```

| Event         | Description                             |
|---------------|-----------------------------------------|
| `topStart`    | Fires when moving to the top.           |
| `topEnd`      | Fires when the top has been reached.    |
| `bottomStart` | Fires when moving to the bottom.        |
| `bottomEnd`   | Fires when the bottom has been reached. |
| `movingStart` | Fires when moving.                      |
| `movingEnd`   | Fires when moving stops.                |
