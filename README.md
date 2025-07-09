# Karabiner Hyper Key Configuration

A powerful Karabiner-Elements configuration that transforms your Caps Lock key into a "Hyper Key" (⌃⌥⇧⌘) to create an extensive system of keyboard shortcuts organized into intuitive sublayers.

## Overview

This configuration implements a sophisticated keyboard shortcut system using the Caps Lock key as a modifier to access multiple layers of functionality. The system is designed to be:

- **Intuitive**: Shortcuts are organized by function (Browse, Open, Window, System, etc.)
- **Efficient**: Common actions are accessible with simple key combinations
- **Extensible**: Easy to add new shortcuts and customize existing ones
- **Conflict-free**: Uses a unique modifier (Hyper) to avoid conflicts with existing shortcuts

## Installation & Setup

### Prerequisites

1. **Karabiner-Elements**: Install from [https://karabiner-elements.pqrs.org/](https://karabiner-elements.pqrs.org/)
2. **Node.js**: Required for building the configuration
3. **Raycast** (recommended): Many shortcuts integrate with Raycast extensions
4. **Rectangle** (recommended): For window management features

### Setup Instructions

1. Clone or download this configuration to your Karabiner directory:
   ```bash
   cd ~/.config/karabiner
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Build the configuration:
   ```bash
   yarn build
   ```

4. Enable the "Default" profile in Karabiner-Elements
5. Grant necessary permissions when prompted

### Development Workflow

- **Edit shortcuts**: Modify `rules.ts`
- **Rebuild**: Run `yarn build` after changes
- **Watch mode**: Use `yarn watch` for automatic rebuilding during development

## Core Functionality

### Hyper Key
- **Caps Lock** → Acts as Hyper Key (⌃⌥⇧⌘) when held
- **Caps Lock alone** → Escape key
- **Hyper + [key]** → Activates sublayer or direct command

### Sublayer System
The configuration uses a sublayer system where:
1. Hold Caps Lock (Hyper)
2. Press a sublayer key (b, o, w, s, v, c, r)
3. While holding both, press the command key
4. Release to execute

## Complete Shortcut Reference

### Hyper + Spacebar: Quick Actions
| Key | Action |
|-----|--------|
| Spacebar | Create Notion Todo |

### Hyper + B: Browse (Websites)
| Key | Action |
|-----|--------|
| t | Open Twitter |
| y | Open Hacker News |
| f | Open Facebook |
| r | Open Reddit |

### Hyper + O: Open Applications
| Key | Application |
|-----|-------------|
| b | Brave Browser |
| g | Google Chrome |
| c | Notion Calendar |
| v | Visual Studio Code |
| s | Slack |
| e | Superhuman (Email) |
| n | Notion |
| t | Terminal |
| z | Zoom |
| f | Finder |
| r | Texts (Messages) |

### Hyper + W: Window Management
| Key | Action |
|-----|--------|
| h | Move to left half |
| j | Move to bottom half |
| k | Move to top half |
| l | Move to right half |
| f | Maximize window |
| y | Move to previous display |
| o | Move to next display |
| u | Previous tab |
| i | Next tab |
| n | Next window |
| b | Browser back |
| m | Browser forward |
| ; | Hide window |

### Hyper + S: System Controls
| Key | Action |
|-----|--------|
| u | Volume up |
| j | Volume down |
| i | Brightness up |
| k | Brightness down |
| p | Play/pause |
| ; | Fast forward |
| l | Lock screen |
| t | Toggle dark/light mode |
| c | Open camera |
| v | Voice control |

### Hyper + V: Vim-like Navigation
| Key | Action |
|-----|--------|
| h | Left arrow |
| j | Down arrow |
| k | Up arrow |
| l | Right arrow |
| u | Page down |
| i | Page up |
| m | Magicmove (homerow.app) |
| s | Scroll mode (homerow.app) |
| d | Duplicate line |

### Hyper + C: Media Controls
| Key | Action |
|-----|--------|
| p | Play/pause |
| n | Next track |
| b | Previous track |

### Hyper + R: Raycast Extensions
| Key | Action |
|-----|--------|
| c | Color picker |
| e | Emoji search |
| a | AI chat |
| s | Silent mention |
| h | Clipboard history |
| q | Quit all applications |
| p | Confetti |
| 1 | Connect Bluetooth device 1 |
| 2 | Connect Bluetooth device 2 |

## File Structure

```
.
├── rules.ts          # Main configuration file
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions for creating shortcuts
├── karabiner.json    # Generated Karabiner configuration
├── package.json      # Node.js dependencies and scripts
└── README.md         # This documentation
```

## Customization

### Adding New Shortcuts

1. **Edit `rules.ts`**: Add new shortcuts to the appropriate sublayer
2. **Use helper functions**: Utilize `app()`, `open()`, `window()`, and `shell()` functions
3. **Rebuild**: Run `yarn build` to generate the new configuration

### Example: Adding a new application shortcut

```typescript
// In rules.ts, add to the 'o' sublayer:
o: {
  // ... existing shortcuts
  x: app("MyApp"),  // Hyper + O + X opens MyApp
}
```

### Example: Adding a new website shortcut

```typescript
// In rules.ts, add to the 'b' sublayer:
b: {
  // ... existing shortcuts
  g: open("https://github.com"),  // Hyper + B + G opens GitHub
}
```

### Example: Adding a custom shell command

```typescript
// In rules.ts, add to any sublayer:
r: {
  // ... existing shortcuts
  m: {
    to: [{ shell_command: "open -a 'My Custom App'" }],
    description: "Open My Custom App"
  }
}
```

## Advanced Features

### Application-Specific Mappings
The configuration includes conditional mappings that only activate when specific applications are focused:

```typescript
// Example: Backspace → Spacebar when Minecraft is focused
{
  description: "Change Backspace to Spacebar when Minecraft is focused",
  conditions: [
    {
      type: "frontmost_application_if",
      file_paths: ["^/path/to/minecraft/java$"]
    }
  ]
}
```

### Integration with External Tools

- **Raycast**: Many shortcuts use `raycast://` URLs for extensions
- **Rectangle**: Window management via `rectangle://` URLs
- **Homerow.app**: Navigation enhancements for vim-like movement

## Development

### TypeScript Structure
- **`KarabinerRules`**: Type definition for rule structure
- **`LayerCommand`**: Helper type for sublayer commands
- **`createHyperSubLayers()`**: Core function that generates sublayer rules

### Utility Functions
- **`app(name)`**: Create shortcut to open application
- **`open(url)`**: Create shortcut to open URL or file
- **`window(action)`**: Create window management shortcut
- **`shell(command)`**: Create custom shell command shortcut

### Building Process
1. `rules.ts` defines the configuration in TypeScript
2. `yarn build` runs the TypeScript compiler
3. Generates `karabiner.json` with the complete configuration
4. Karabiner-Elements automatically loads the new configuration

## Troubleshooting

### Common Issues

1. **Shortcuts not working**: Check that Karabiner-Elements has the necessary permissions
2. **Configuration not loading**: Ensure `karabiner.json` was generated correctly with `yarn build`
3. **Conflicts with existing shortcuts**: The Hyper key should avoid most conflicts, but check for conflicting Karabiner rules

### Debugging
- Use Karabiner-Elements' EventViewer to debug key events
- Check the console for any JSON parsing errors
- Verify that all referenced applications are installed

## Contributing

This configuration is designed to be easily customizable. Feel free to:
- Add new sublayers for different workflows
- Modify existing shortcuts to match your preferences
- Add integration with your favorite applications
- Submit improvements and bug fixes

## License

MIT License - feel free to use, modify, and distribute as needed.