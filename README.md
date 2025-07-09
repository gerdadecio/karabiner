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

### Hyper + SPACEBAR: Quick Actions
| Key | Action |
|-----|--------|
| Spacebar | Open raycast://extensions/stellate/mxstbr-commands/create-notion-todo |

### Hyper + B: Browse (Websites)
| Key | Action |
|-----|--------|
| t | Open https://twitter.com |
| y | Open https://news.ycombinator.com |
| f | Open https://facebook.com |
| r | Open https://reddit.com |
| h | Open https://hashnode.com/draft |

### Hyper + O: Open Applications
| Key | Action |
|-----|--------|
| b | Open -a 'Brave.app' |
| g | Open -a 'Google Chrome.app' |
| c | Open -a 'Notion Calendar.app' |
| v | Open -a 'Zed.app' |
| d | Open -a 'Discord.app' |
| s | Open -a 'Slack.app' |
| t | Open -a 'Terminal.app' |
| z | Open -a 'zoom.us.app' |
| m | Open -a 'Reflect.app' |
| r | Open -a 'Reflect.app' |
| f | Open -a 'Finder.app' |
| i | Open -a 'Texts.app' |
| p | Open -a 'Spotify.app' |
| a | Open -a 'iA Presenter.app' |
| w | Open Texts |
| l | Open raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink |

### Hyper + W: Window Management
| Key | Action |
|-----|--------|
| semicolon | Window: Hide |
| y | Window: previous-display |
| o | Window: next-display |
| k | Window: top-half |
| j | Window: bottom-half |
| h | Window: left-half |
| l | Window: right-half |
| f | Window: maximize |
| u | Window: Previous Tab |
| i | Window: Next Tab |
| n | Window: Next Window |
| b | Window: Back |
| m | Window: Forward |

### Hyper + S: System Controls
| Key | Action |
|-----|--------|
| u | Volume up |
| j | Volume down |
| i | Brightness up |
| k | Brightness down |
| l | Lock screen |
| p | Play/pause |
| semicolon | Fast forward |
| t | Open raycast://extensions/raycast/system/toggle-system-appearance |
| c | Open raycast://extensions/raycast/system/open-camera |
| v | Voice control |

### Hyper + V: Vim-like Navigation
| Key | Action |
|-----|--------|
| h | Left arrow |
| j | Down arrow |
| k | Up arrow |
| l | Right arrow |
| m | Magicmove (homerow.app) |
| s | Scroll mode (homerow.app) |
| d | Duplicate line |
| u | Page down |
| i | Page up |

### Hyper + C: Media Controls
| Key | Action |
|-----|--------|
| p | Play/pause |
| n | Fast forward |
| b | Previous track |

### Hyper + R: Raycast Extensions
| Key | Action |
|-----|--------|
| 1 | Open raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1 |
| 2 | Open raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2 |
| c | Open raycast://extensions/thomas/color-picker/pick-color |
| e | Open raycast://extensions/raycast/emoji-symbols/search-emoji-symbols |
| p | Open raycast://extensions/raycast/raycast/confetti |
| a | Open raycast://extensions/raycast/raycast-ai/ai-chat |
| s | Open raycast://extensions/peduarte/silent-mention/index |
| h | Open raycast://extensions/raycast/clipboard-history/clipboard-history |
| q | Open raycast://extensions/mackopes/quit-applications/quit-all-applications |

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