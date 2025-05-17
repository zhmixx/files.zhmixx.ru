#!/bin/bash
set -e

echo "Updating system and installing Hyprland + dependencies..."
sudo pacman -Syu --noconfirm

sudo pacma-S --noconfirm \
    hyprland xorg-xwayland xdg-desktop-portal-hyprland \
    waybar kitty dunst thunar pipewire pipewire-pulse wireplumber \
    wl-clipboard xdg-utils xdg-user-dirs \
    ttf-font-awesome ttf-jetbrains-mono noto-fonts noto-fonts-emoji \
 #!/bin/bash
set -e

echo "Updating system and installing Hyprland + dependencies..."
sudo pacman -Syu --noconfirm

sudo pacman -S --noconfirm \
    hyprland xorg-xwayland xdg-desktop-portal-hyprland \
    waybar kitty dunst thunar pipewire pipewire-pulse wireplumber \
    wl-clipboard xdg-utils xdg-user-dirs \
    ttf-font-awesome ttf-jetbrains-mono noto-fonts noto-fonts-emoji \
    mesa vulkan-radeon vulkan-icd-loader git

echo "Creating user config folders..."
mkdir -p ~/.config/hypr ~/.config/waybar ~/.config/dunst ~/.config/kitty

echo "Fetching Hyprland example config..."
git clone https://github.com/hyprwm/Hyprland.git ~/Hyprland-temp
cp ~/Hyprland-temp/example/hyprland.conf ~/.config/hypr/
rm -rf ~/Hyprland-temp

echo "Creating minimal Waybar config..."
cat > ~/.config/waybar/config <<'EOF'
{
  "layer": "top",
  "position": "top",
  "modules-left": ["workspaces"],
  "modules-center": ["clock"],
  "modules-right": ["battery", "pulseaudio"]
}
EOF

echo "Creating minimal Waybar style..."
cat > ~/.config/waybar/style.css <<'EOF'
* {
  font-family: JetBrains Mono, monospace;
  font-size: 12px;
  color: #ffffff;
  background: #1e1e2e;
}
EOF

echo "Creating minimal Dunst config..."
cat > ~/.config/dunst/dunstrc <<'EOF'
[global]
    font = JetBrains Mono 10
    frame_width = 1
    separator_height = 2
    separator_color = "#44475a"
    background = "#282a36"
    foreground = "#f8f8f2"
EOF

echo "Creating minimal Kitty config..."
cat > ~/.config/kitty/kitty.conf <<'EOF'
font_family JetBrains Mono
font_size 12.0
background_opacity 0.9
EOF

echo "Setting up .bash_profile to start Hyprland on tty1..."
echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && exec Hyprland' >> ~/.bash_profile

echo "Installation and configuration complete!"
echo "Reboot now and log in as your user to start Hyprland."

   mesa vulkan-radeon vulkan-icd-loader git

echo "Creating user config folders..."
mkdir -p ~/.config/hypr ~/.config/waybar ~/.config/dunst ~/.config/kitty

echo "Fetching Hyprland example config..."
git clone https://github.com/hyprwm/Hyprland.git ~/Hyprland-temp
cp ~/Hyprland-temp/example/hyprland.conf ~/.config/hypr/
rm -rf ~/Hyprland-temp

echo "Creating minimal Waybar config..."
cat > ~/.config/waybar/config <<'EOF'
{
  "layer": "top",
  "position": "top",
  "modules-left": ["workspaces"],
  "modules-center": ["clock"],
  "modules-right": ["battery", "pulseaudio"]
}
EOF

echo "Creating minimal Waybar style..."
cat > ~/.config/waybar/style.css <<'EOF'
* {
  font-family: JetBrains Mono, monospace;
  font-size: 12px;
  color: #ffffff;
  background: #1e1e2e;
}
EOF

echo "Creating minimal Dunst config..."
cat > ~/.config/dunst/dunstrc <<'EOF'
[global]
    font = JetBrains Mono 10
    frame_width = 1
    separator_height = 2
    separator_color = "#44475a"
    background = "#282a36"
    foreground = "#f8f8f2"
EOF

echo "Creating minimal Kitty config..."
cat > ~/.config/kitty/kitty.conf <<'EOF'
font_family JetBrains Mono
font_size 12.0
background_opacity 0.9
EOF

echo "Setting up .bash_profile to start Hyprland on tty1..."
echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && exec Hyprland' >> ~/.bash_profile

echo "Installation and configuration complete!"
echo "Reboot now and log in as your user to start Hyprland."