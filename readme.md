# UI Kioskboard Widget

[![GitHub](https://img.shields.io/badge/GitHub-gray?style=flat-square&logo=github&logoColor=white&label=)](https://github.com/ANDOR-Automation-AB/node-red-dashboard-2-widgets-ui-kioskboard)
[![npm](https://img.shields.io/badge/npm-gray?style=flat-square&logo=npm&logoColor=white&label=)](https://www.npmjs.com/package/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard)
![GitHub last commit](https://img.shields.io/github/last-commit/ANDOR-Automation-AB/node-red-dashboard-2-widgets-ui-kioskboard?color=gray)
[![npm version](https://img.shields.io/npm/v/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard.svg)](https://www.npmjs.com/package/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard)
[![npm downloads](https://img.shields.io/npm/dt/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard.svg)](https://www.npmjs.com/package/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard)
[![License](https://img.shields.io/npm/l/@andor-automation/node-red-dashboard-2-widgets-ui-kioskboard.svg)](https://github.com/ANDOR-Automation-AB/node-red-dashboard-2-widgets-ui-kioskboard/blob/main/LICENSE)

This project provides a text input field with an on-screen keyboard powered by furcan KioskBoard.

## Version history

**Maintenance notice**  
This project will no longer be actively developed or maintained.  
The code will remain available for use as-is, but no further updates or support are planned.

### 1.1.2
- Fixed an issue where the input value was not converted back correctly when the output used a scaling factor.
- Changed behavior so the value defaults to an empty string when ``msg`` is missing in ``onLoad`` or ``onInput``.

### 1.1.1
- Added scale option for converting value to calibrated or unit-adjusted output.

### 1.0.1
- Added support for closing the virtual keyboard when pressing Enter on a physical keyboard.
- Animation handling for `fade` and `slide` transitions when using Enter on a physical keyboard.

### 1.0.0
- Initial release.


## Install and Update

Make sure you install this widget inside your `.node-red` directory.
```
cd ~/.node-red
```

Install this widget in your `~/.node-red` folder by using the following command
```
npm i @andor-automation/node-red-dashboard-2-widgets-ui-kioskboard
```

**Restart node-red**

## Properties

### Main

- **Topic**  
  Defines the `msg.topic`.  
  
  If the Topic is blank no `msg.topic` will be sent.  
  **Note:** This Topic will be overwritten if any input `msg.topic` arrive.

- **Label**  
  Set the input label text. Also sets the placeholder text of the input field.

- **Scale**  
  Factor to multiply the entered value before sending.

- **Type**  
  Select the type of keyboard.  
  
  Avaliable options:
  - all — Standard keys and numpad (default)
  - keyboard — Keys only
  - numpad — Numpad only

- **Special**  
  Displays a button to open the special characters keyboard.

- **Theme**  
  Select the visual style of the keyboard.  
  
  Available options:
  - light — Light theme (default)
  - dark — Dark mode
  - flat — Minimal flat design
  - material — Material-style design
  - oldschool — Classic button look

- **Gap**  
  Defines the gap between the input label and the input field.  
  
  Must have a value between 1 and 12.

- **Autoscroll**  
  Enable scroll into view when opened on smaller screens.

- **CapsLock**  
  Enable start with uppercase letters.

- **Keyboard**  
  Allow use of a physical (hardware) keyboard. 

- **Mobile**  
  Allow on-screen keyboard provided by the mobile device.

- **Animate**
  Enable animated transitions.

- **Duration**  
  Set the duration of the animated transition.

- **Animation**  
  Select the CSS animation used when opening or closing the keyboard.  
  
  Available options:
  - slide — Slides in and out. (default)
  - fade — Fades in and out.

- **Spacebar**  
  Allow use of the spacebar.

- **Spacebar text**  
  Define the spacebar label. Use a blank `" "` to use an empty space label.

- **Font**  
  Define the font family of the keys.

- **Fontsize**  
  Define the font size of the keys.

- **Fontweight**  
  Define the font weight of the keys.  
  
  Weight can be specified using keyword values or numeric values ranging from 100 to 900.  
  
  Keyword values example:
  - normal — Defines normal characters (default).
  - bold — Defines thick characters.

  Numeric values (range from 100 to 900) example:
  - 400 — equivalent to normal.
  - 700 — equivalent to bold.

- **Iconsize**  
  Define the size of the icon keys.

- **Return text**  
  Define the return key label. Use a blank `" "` to use an empty return key label.

- **Close on return**  
  Define if the Enter key can close and remove the keyboard.

### Keys
Define the keyboard layout.

- **Keys JSON (mandatory)**  
  Defines the keyboard layout. Must be a valid JSON array of row objects.
  
  Example:
  ```json
  [
    {"0": "A", "1": "B", "2": "C"},
    {"0": "D", "1": "E", "2": "F"},
    {"0": "G", "1": "H", "2": "I"},
    {"0": "J", "1": "K", "2": "L"}
  ]
  ```

- **Special Characters (optional)**  
  Override the built-in special characters.
  
  Example:
  ```json
  ["#", "€", "%", "+", "-", "*"]
  ```

- **Numpad keys JSON (optional)**  
  Override the built-in numpad keys.
  
  Example:
  ```json
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  ```