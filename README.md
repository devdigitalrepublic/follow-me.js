Div Follow
===========

Makes an element follow the screen, but only within the bounds of some element.

Usage Example
----

This plugin assumes a two (or more) column setup. See the demo page if you need more help.

#### HTML:
```html
<div id="container">
    <div id="right-column">
        <div id="follow-me">
            I'm following you!
        </div>
    </div>

    <div id="left-column">
      Content
    </div>
</div>
```

#### CSS:
```css
#container {
    overflow: auto;
}

#left-column {
    width: 70%;
    float: right;
}

#right-column {
    width: 30%;
    float: right;
}
```

#### JAVASCRIPT
```javascript
  $("#follow-me").follow();
```

Make sure to include the name of your container if you've named it something other than "container".

```javascript
  $("#follow-me").follow({
    container: "my-container-name"
  });
```
... where "my-container-name" is an **element ID** and is the container that **spans the entire height** of the area you want the element to follow you in.