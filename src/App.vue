<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { remote } from "electron";
const { Menu } = remote;

const createDefaultMenu = () => {
  const template = [
    {
      label: "Undo",
      role: "undo",
    },
    {
      label: "Redo",
      role: "redo",
    },
    {
      type: "separator",
    },
    {
      label: "Cut",
      role: "cut",
    },
    {
      label: "Copy",
      role: "copy",
    },
    {
      label: "Paste",
      role: "paste",
    },
    {
      label: "Select All",
      role: "selectall",
    },
  ];
  return Menu.buildFromTemplate(template);
};

export default {
  name: "App",
  created() {
    const menu = createDefaultMenu();
    window.addEventListener("contextmenu", () => {
      menu.popup(remote.getCurrentWindow());
    });
  },
};
</script>
