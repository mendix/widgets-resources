## Animation

Bring animations to your Native application by placing content in the animate widget.

#### Usage

-   Place the widget on the page
-   Place the content inside the content section
-   Select the animation
-   Optional set the conditions based on time, visibilty or expression

### Animations

We group the animation effect in 3 categories; entrance, attention and exits;

#### Entrance

Bounce  
![Bounce entrances](assets/bounce-entrances.gif)

Fading  
![Fading entrances](assets/fading-entrances.gif)

Sliding  
![Sliding entrances](assets/sliding-entrances.gif)

Zooming  
![Zooming entrances](assets/zooming-entrances.gif)

Flip  
![Flip entrances](assets/flippers.gif)

Light speed  
![Light speed entrance](assets/light-speed.gif)

#### Attention

![Attention](assets/attention.gif)

#### Exits

Bounce  
![Bounce exits](assets/bounce-exits.gif)

Zooming  
![Zooming exits](assets/zooming-exits.gif)

Fading  
![Fading exits](assets/fading-exits.gif)

Sliding  
![Sliding exits](assets/sliding-exits.gif)

Flipping  
![Flip exits](assets/flippers.gif)

Light speed  
![Light speed exit](assets/light-speed.gif)

### Easing

Easing functions specify the rate of change of a animations over time.

Objects in real life don’t just start and stop instantly, and almost never move at a constant speed. When we open a
drawer, we first move it quickly, and slow it down as it comes out. Drop something on the floor, and it will first
accelerate downwards, and then bounce back up after hitting the floor.

For live samples see: https://easings.net/en#

### Styling

To add a defaults style in older Atlas versions, you can add a file `theme/styles/native/app/custom.js` with the
following content:

```js
export const com_mendix_widget_native_animation_Animation = (Animation = {
    container: {
        // All ViewStyle properties are allowed
    }
});
```

### Design properties

To bring the same design properties as the container widget into an older Atlas versions. You can add to the
`theme/settings-native.json` the following design properties:

```js
"com.mendix.widget.native.animation.Animation": [
    {
        "name": "Spacing top",
        "type": "Dropdown",
        "description": "The spacing above this element.",
        "options": [
            {
                "name": "Inner small",
                "class": "spacingInnerTop"
            },
            {
                "name": "Inner medium",
                "class": "spacingInnerTopMedium"
            },
            {
                "name": "Inner large",
                "class": "spacingInnerTopLarge"
            },
            {
                "name": "Outer small",
                "class": "spacingOuterTop"
            },
            {
                "name": "Outer medium",
                "class": "spacingOuterTopMedium"
            },
            {
                "name": "Outer large",
                "class": "spacingOuterTopLarge"
            }
        ]
    },

    {
        "name": "Spacing bottom",
        "type": "Dropdown",
        "description": "The spacing below this element.",
        "options": [
            {
                "name": "Inner small",
                "class": "spacingInnerBottom"
            },
            {
                "name": "Inner medium",
                "class": "spacingInnerBottomMedium"
            },
            {
                "name": "Inner large",
                "class": "spacingInnerBottomLarge"
            },
            {
                "name": "Outer small",
                "class": "spacingOuterBottom"
            },
            {
                "name": "Outer medium",
                "class": "spacingOuterBottomMedium"
            },
            {
                "name": "Outer large",
                "class": "spacingOuterBottomLarge"
            }
        ]
    },

    {
        "name": "Spacing left",
        "type": "Dropdown",
        "description": "The spacing to the left of this element.",
        "options": [
            {
                "name": "Inner small",
                "class": "spacingInnerLeft"
            },
            {
                "name": "Inner medium",
                "class": "spacingInnerLeftMedium"
            },
            {
                "name": "Inner large",
                "class": "spacingInnerLeftLarge"
            },
            {
                "name": "Outer small",
                "class": "spacingOuterLeft"
            },
            {
                "name": "Outer medium",
                "class": "spacingOuterLeftMedium"
            },
            {
                "name": "Outer large",
                "class": "spacingOuterLeftLarge"
            }
        ]
    },

    {
        "name": "Spacing right",
        "type": "Dropdown",
        "description": "The spacing to the right of this element.",
        "options": [
            {
                "name": "Inner small",
                "class": "spacingInnerRight"
            },
            {
                "name": "Inner medium",
                "class": "spacingInnerRightMedium"
            },
            {
                "name": "Inner large",
                "class": "spacingInnerRightLarge"
            },
            {
                "name": "Outer small",
                "class": "spacingOuterRight"
            },
            {
                "name": "Outer medium",
                "class": "spacingOuterRightMedium"
            },
            {
                "name": "Outer large",
                "class": "spacingOuterRightLarge"
            }
        ]
    },

    {
        "name": "Size",
        "type": "Dropdown",
        "description": "Change the size of the widget relative to its sibling(s).",
        "options": [
            {
                "name": "Maximum space",
                "class": "flexMain"
            },
            {
                "name": "Minimum space",
                "class": "flexItem"
            }
        ]
    },

    {
        "name": "Background color",
        "type": "Dropdown",
        "description": "Change the background color of the container.",
        "options": [
            {
                "name": "Primary",
                "class": "backgroundPrimary"
            },
            {
                "name": "Secondary",
                "class": "backgroundSecondary"
            }
        ]
    },

    {
        "name": "Align",
        "type": "Dropdown",
        "description": "Aligns the element. This overrides 'Align children' of the parent.",
        "options": [
            {
                "name": "Stretch",
                "class": "alignSelfStretch"
            },
            {
                "name": "Start",
                "class": "alignSelfStart"
            },
            {
                "name": "Center",
                "class": "alignSelfCenter"
            },
            {
                "name": "End",
                "class": "alignSelfEnd"
            }
        ]
    },

    {
        "name": "Render children horizontal",
        "type": "Toggle",
        "description": "Determines the direction in which children are rendered.",
        "class": "flexRow"
    },

    {
        "name": "Wrap children",
        "type": "Toggle",
        "description": "Determines if children can flow into multiple lines if they hit the end of the container.",
        "class": "flexWrap"
    },

    {
        "name": "Align children",
        "type": "Dropdown",
        "description": "Align children in the opposite direction.",
        "options": [
            {
                "name": "Center",
                "class": "alignChildrenCenter"
            },
            {
                "name": "End",
                "class": "alignChildrenEnd"
            },
            {
                "name": "Stretch",
                "class": "alignChildrenStretch"
            }
        ]
    },

    {
        "name": "Justify children",
        "type": "Dropdown",
        "description": "Justify children in the active direction.",
        "options": [
            {
                "name": "Center",
                "class": "justifyChildrenCenter"
            },
            {
                "name": "End",
                "class": "justifyChildrenEnd"
            },
            {
                "name": "Space between",
                "class": "justifyChildrenSpaceBetween"
            },
            {
                "name": "Space around",
                "class": "justifyChildrenSpaceAround"
            }
        ]
    }
]
```
