import fs from "fs";
import { createHyperSubLayers, app, open, window, shell } from "./utils";

// Define the same configuration as in rules.ts
const sublayerConfig = {
  spacebar: open(
    "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
  ),
  // b = "B"rowse
  b: {
    t: open("https://twitter.com"),
    y: open("https://news.ycombinator.com"),
    f: open("https://facebook.com"),
    r: open("https://reddit.com"),
    h: open("https://hashnode.com/draft"),
  },
  // o = "Open" applications
  o: {
    b: app("Brave"),
    g: app("Google Chrome"),
    c: app("Notion Calendar"),
    v: app("Zed"),
    d: app("Discord"),
    s: app("Slack"),
    t: app("Terminal"),
    z: app("zoom.us"),
    // "M"arkdown (Reflect.app)
    m: app("Reflect"),
    r: app("Reflect"),
    f: app("Finder"),
    // "i"Message
    i: app("Texts"),
    p: app("Spotify"),
    a: app("iA Presenter"),
    // "W"hatsApp has been replaced by Texts
    w: open("Texts"),
    l: open(
      "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
    ),
  },

  // w = "Window"
  w: {
    semicolon: {
      description: "Window: Hide",
      to: [
        {
          key_code: "h",
          modifiers: ["right_command"],
        },
      ],
    },
    y: window("previous-display"),
    o: window("next-display"),
    k: window("top-half"),
    j: window("bottom-half"),
    h: window("left-half"),
    l: window("right-half"),
    f: window("maximize"),
    u: {
      description: "Window: Previous Tab",
      to: [
        {
          key_code: "tab",
          modifiers: ["right_control", "right_shift"],
        },
      ],
    },
    i: {
      description: "Window: Next Tab",
      to: [
        {
          key_code: "tab",
          modifiers: ["right_control"],
        },
      ],
    },
    n: {
      description: "Window: Next Window",
      to: [
        {
          key_code: "grave_accent_and_tilde",
          modifiers: ["right_command"],
        },
      ],
    },
    b: {
      description: "Window: Back",
      to: [
        {
          key_code: "open_bracket",
          modifiers: ["right_command"],
        },
      ],
    },
    // Note: No literal connection. Both f and n are already taken.
    m: {
      description: "Window: Forward",
      to: [
        {
          key_code: "close_bracket",
          modifiers: ["right_command"],
        },
      ],
    },
  },

  // s = "System"
  s: {
    u: {
      to: [
        {
          key_code: "volume_increment",
        },
      ],
    },
    j: {
      to: [
        {
          key_code: "volume_decrement",
        },
      ],
    },
    i: {
      to: [
        {
          key_code: "display_brightness_increment",
        },
      ],
    },
    k: {
      to: [
        {
          key_code: "display_brightness_decrement",
        },
      ],
    },
    l: {
      to: [
        {
          key_code: "q",
          modifiers: ["right_control", "right_command"],
        },
      ],
    },
    p: {
      to: [
        {
          key_code: "play_or_pause",
        },
      ],
    },
    semicolon: {
      to: [
        {
          key_code: "fastforward",
        },
      ],
    },
    // "T"heme
    t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
    c: open("raycast://extensions/raycast/system/open-camera"),
    // 'v'oice
    v: {
      to: [
        {
          key_code: "spacebar",
          modifiers: ["left_option"],
        },
      ],
    },
  },

  // v = "moVe" which isn't "m" because we want it to be on the left hand
  // so that hjkl work like they do in vim
  v: {
    h: {
      to: [{ key_code: "left_arrow" }],
    },
    j: {
      to: [{ key_code: "down_arrow" }],
    },
    k: {
      to: [{ key_code: "up_arrow" }],
    },
    l: {
      to: [{ key_code: "right_arrow" }],
    },
    // Magicmove via homerow.app
    m: {
      to: [{ key_code: "f", modifiers: ["right_control"] }],
      // TODO: Trigger Vim Easymotion when VSCode is focused
    },
    // Scroll mode via homerow.app
    s: {
      to: [{ key_code: "j", modifiers: ["right_control"] }],
    },
    d: {
      to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
    },
    u: {
      to: [{ key_code: "page_down" }],
    },
    i: {
      to: [{ key_code: "page_up" }],
    },
  },

  // c = Musi*c* which isn't "m" because we want it to be on the left hand
  c: {
    p: {
      to: [{ key_code: "play_or_pause" }],
    },
    n: {
      to: [{ key_code: "fastforward" }],
    },
    b: {
      to: [{ key_code: "rewind" }],
    },
  },

  // r = "Raycast"
  r: {
    c: open("raycast://extensions/thomas/color-picker/pick-color"),
    e: open(
      "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
    ),
    p: open("raycast://extensions/raycast/raycast/confetti"),
    a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    s: open("raycast://extensions/peduarte/silent-mention/index"),
    h: open(
      "raycast://extensions/raycast/clipboard-history/clipboard-history"
    ),
    q: open("raycast://extensions/mackopes/quit-applications/quit-all-applications"),
    1: open(
      "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
    ),
    2: open(
      "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
    ),
  },
};

/**
 * Extract sublayer descriptions from comments in the original source
 */
function getSublayerDescriptions(): { [key: string]: string } {
  return {
    spacebar: "Quick Actions",
    b: "Browse (Websites)",
    o: "Open Applications",
    w: "Window Management",
    s: "System Controls",
    v: "Vim-like Navigation",
    c: "Media Controls",
    r: "Raycast Extensions",
  };
}

/**
 * Generate a readable action description from a LayerCommand
 */
function getActionDescription(command: any): string {
  // If it has a description property, use it
  if (command.description) {
    return command.description;
  }

  // If it has a to array, analyze the first action
  if (command.to && command.to.length > 0) {
    const firstAction = command.to[0];
    
    // Handle shell commands
    if (firstAction.shell_command) {
      const shellCmd = firstAction.shell_command;
      
      // Handle open commands
      if (shellCmd.startsWith('open ')) {
        const target = shellCmd.substring(5).trim();
        
        // Handle app opening
        if (target.startsWith('-a ')) {
          const appName = target.substring(3).replace(/'/g, '').replace('.app', '');
          return appName;
        }
        
        // Handle URLs
        if (target.startsWith('http')) {
          try {
            const domain = new URL(target).hostname.replace('www.', '');
            return domain.charAt(0).toUpperCase() + domain.slice(1);
          } catch {
            return `Open ${target}`;
          }
        }
        
        // Handle Raycast URLs
        if (target.startsWith('raycast://')) {
          if (target.includes('/color-picker/')) return 'Color picker';
          if (target.includes('/emoji-symbols/')) return 'Emoji search';
          if (target.includes('/confetti')) return 'Confetti';
          if (target.includes('/ai-chat')) return 'AI chat';
          if (target.includes('/silent-mention/')) return 'Silent mention';
          if (target.includes('/clipboard-history/')) return 'Clipboard history';
          if (target.includes('/quit-applications/')) return 'Quit all applications';
          if (target.includes('/connect-favorite-device-1')) return 'Connect Bluetooth device 1';
          if (target.includes('/connect-favorite-device-2')) return 'Connect Bluetooth device 2';
          if (target.includes('/toggle-system-appearance')) return 'Toggle dark/light mode';
          if (target.includes('/open-camera')) return 'Open camera';
          if (target.includes('/open-mxs-is-shortlink')) return 'Open shortlink';
          if (target.includes('/create-notion-todo')) return 'Create Notion Todo';
          if (target.includes('/window-management/')) {
            const action = target.split('/window-management/')[1];
            return `Window: ${action}`;
          }
          return 'Raycast Extension';
        }
        
        // Handle simple text targets (like "Texts")
        if (!target.includes('/') && !target.includes('://')) {
          return target;
        }
        
        return `Open ${target}`;
      }
      
      return shellCmd;
    }
    
    // Handle key codes
    if (firstAction.key_code) {
      const key = firstAction.key_code;
      const mods = firstAction.modifiers || [];
      
      if (key === 'volume_increment') return 'Volume up';
      if (key === 'volume_decrement') return 'Volume down';
      if (key === 'display_brightness_increment') return 'Brightness up';
      if (key === 'display_brightness_decrement') return 'Brightness down';
      if (key === 'play_or_pause') return 'Play/pause';
      if (key === 'fastforward') return 'Fast forward';
      if (key === 'rewind') return 'Previous track';
      if (key === 'left_arrow') return 'Left arrow';
      if (key === 'right_arrow') return 'Right arrow';
      if (key === 'up_arrow') return 'Up arrow';
      if (key === 'down_arrow') return 'Down arrow';
      if (key === 'page_up') return 'Page up';
      if (key === 'page_down') return 'Page down';
      if (key === 'tab') {
        if (mods.includes('right_control') && mods.includes('right_shift')) return 'Previous tab';
        if (mods.includes('right_control')) return 'Next tab';
      }
      if (key === 'grave_accent_and_tilde' && mods.includes('right_command')) return 'Next window';
      if (key === 'open_bracket' && mods.includes('right_command')) return 'Browser back';
      if (key === 'close_bracket' && mods.includes('right_command')) return 'Browser forward';
      if (key === 'h' && mods.includes('right_command')) return 'Hide window';
      if (key === 'q' && mods.includes('right_control') && mods.includes('right_command')) return 'Lock screen';
      if (key === 'spacebar' && mods.includes('left_option')) return 'Voice control';
      if (key === 'f' && mods.includes('right_control')) return 'Magicmove (homerow.app)';
      if (key === 'j' && mods.includes('right_control')) return 'Scroll mode (homerow.app)';
      if (key === 'd' && mods.includes('right_shift') && mods.includes('right_command')) return 'Duplicate line';
      
      return `${key} key`;
    }
  }
  
  return 'Unknown action';
}

/**
 * Generate markdown table for a sublayer
 */
function generateSublayerTable(sublayerKey: string, commands: any, description: string): string {
  const sublayerName = sublayerKey.toUpperCase();
  const sectionTitle = description || 'Commands';
  
  // Handle direct commands (not sublayers)
  if (commands.description || commands.to) {
    return `### Hyper + ${sublayerName}: ${sectionTitle}
| Key | Action |
|-----|--------|
| ${sublayerKey === 'spacebar' ? 'Spacebar' : sublayerKey} | ${getActionDescription(commands)} |`;
  }
  
  // Handle sublayer objects
  if (typeof commands === 'object') {
    const rows = Object.entries(commands).map(([key, command]) => {
      const action = getActionDescription(command);
      return `| ${key} | ${action} |`;
    }).join('\n');
    
    return `### Hyper + ${sublayerName}: ${sectionTitle}
| Key | Action |
|-----|--------|
${rows}`;
  }
  
  return '';
}

/**
 * Generate the complete shortcut reference section
 */
function generateShortcutReference(): string {
  const descriptions = getSublayerDescriptions();
  
  const sections = Object.entries(sublayerConfig).map(([key, commands]) => {
    const description = descriptions[key] || '';
    return generateSublayerTable(key, commands, description);
  }).filter(section => section.length > 0);
  
  return `## Complete Shortcut Reference

${sections.join('\n\n')}`;
}

/**
 * Update the README.md file with new shortcut reference
 */
function updateReadme(): void {
  const readmePath = "./README.md";
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // Find the start and end of the shortcut reference section
  const startMarker = "## Complete Shortcut Reference";
  const endMarker = "## File Structure";
  
  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find shortcut reference section markers in README.md");
    return;
  }
  
  // Replace the section with updated content
  const beforeSection = readmeContent.substring(0, startIndex);
  const afterSection = readmeContent.substring(endIndex);
  const newShortcutReference = generateShortcutReference();
  
  const updatedContent = beforeSection + newShortcutReference + '\n\n' + afterSection;
  
  fs.writeFileSync(readmePath, updatedContent, 'utf8');
  console.log("README.md updated successfully with current shortcut mappings!");
}

// Run the update
updateReadme();