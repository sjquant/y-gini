<template>
  <section>
    <q-editor
      class="full-height"
      v-model="content"
      :definitions="{
        readPDF: {
          tip: 'Read PDF',
          icon: 'picture_as_pdf',
          label: 'PDF',
          handler: openPDF,
        },
        translate: {
          tip: 'Translate',
          icon: 'translate',
          label: 'translate',
          handler: translate,
        },
      }"
      :toolbar="[['readPDF', 'translate']]"
    />
  </section>
</template>

<script>
import utils from "../utils.js";
import { remote } from "electron";

const PDFParser = remote.require("pdf2json");

export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async translate() {
      const selection = window.getSelection().toString();
      const text = selection ? selection : this.content;
      this.$store.dispatch("TRANSLATE", utils.cleanText(text));
    },
    async openPDF() {
      const dialog = remote.dialog;
      let filePath;
      try {
        const result = await dialog.showOpenDialog({
          properties: ["openFile"],
          filters: [
            { name: "pdf", extensions: ["pdf"] },
            { name: "All Files", extensions: ["*"] },
          ],
        });
        filePath = result.filePaths[0];
      } catch (err) {
        alert("파일 읽기에 실패했습니다.");
        return;
      }

      let pdfParser = new PDFParser(null, 1);
      pdfParser.on("pdfParser_dataError", errData =>
        console.error(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", _ => {
        this.content = utils.createParagraph(pdfParser.getRawTextContent());
      });
      pdfParser.loadPDF(filePath);
    },
  },
};
</script>
