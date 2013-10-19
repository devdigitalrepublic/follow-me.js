Div Follow
===========

Makes an element follow the screen, but only within the bounds of some element.


#### HTML:
This plugin assumes a two (or more) column setup. [See the demo page](http://korobu.com/divfollow/demo/) if you need more help.
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
Your setup may be quite different, but the idea is that there is content on one side of the page and something following you up/down on the other side of the page. Make sure your container has overflow:auto or that you have some sort of clearfix so it will properly span the height of its floating children.
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
This is the simplest way to use divfollow in your project.
```javascript
$("#follow-me").follow();
```

Make sure to include the name of your container if you've named it something other than "container". "my-container-name" must be an **element ID** and must be the container that **spans the entire height** of the area you want the element to follow you in.

```javascript
$("#follow-me").follow({
  container: "my-container-name"
});
```

You can call functions after and before the element has reached the top, bottom, or while moving.

```javascript
$("#follow-me").follow({
  topStart: myFunction,
  topEnd: myFunction,

  bottomStart: myFunction,
  bottomEnd: myFunction,

  movingStart: myFunction
  movingEnd: myFunction
});
```

#### SPEED
The default speed is 500.
```javascript
$("#follow-me").follow({
  speed: 500
});
```

#### OFFSET
Specifying an offset can be useful if you have a fixed header or something blocking part of the screen. You can use a number or offset by the height of some element.
```javascript
$("#follow-me").follow({
  offset: 50
});

$("#follow-me").follow({
  offsetElement: "navigation"
});
```

Todo
----
- Suggestions?