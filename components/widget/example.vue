<template>
  <div id="widget-nps-container"
       :style="`right: 15px; bottom: 15px; background-color: ${formValue.bgColor}; border: ${formValue.borderSize}px solid ${formValue.borderColor}; visibility: visible; opacity: 1;`"
       class="wd-nps-full">
    <div id="wd-button-close" :style="`background-color: ${formValue.color}`">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>
      </svg>
    </div>
    <div class="wd-message-container"><h2 :style="`opacity: 1; font-size: ${formValue.fontSize}px`">avalie sua
      experiência na nossa plataforma</h2></div>
    <div id="wd-button-container" style="visibility: visible; opacity: 1;"><label><input id="note-1"
                                                                                         class="wd-notes"
                                                                                         disabled
                                                                                         name="note"
                                                                                         style="background-color: rgb(255, 255, 255);"
                                                                                         type="radio"
                                                                                         value="1"><span>1</span></label><label><input
        id="note-2" class="wd-notes" disabled name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="2"><span>2</span></label><label><input id="note-3" class="wd-notes"
                                                      disabled
                                                      name="note"
                                                      style="background-color: rgb(255, 255, 255);" type="radio"
                                                      value="3"><span>3</span></label><label><input
        id="note-4" class="wd-notes" disabled name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="4"><span>4</span></label><label><input id="note-5" :style="`background-color: ${formValue.color};`"
                                                      class="wd-notes"
                                                      disabled
                                                      name="note" type="radio"
                                                      value="5"><span>5</span></label><label><input
        id="note-6" class="wd-notes" disabled name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="6"><span>6</span></label><label><input id="note-7" class="wd-notes"
                                                      disabled
                                                      name="note"
                                                      style="background-color: rgb(255, 255, 255);" type="radio"
                                                      value="7"><span>7</span></label><label><input
        id="note-8" class="wd-notes" disabled name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="8"><span>8</span></label><label><input id="note-9" class="wd-notes"
                                                      disabled
                                                      name="note"
                                                      style="background-color: rgb(255, 255, 255);" type="radio"
                                                      value="9"><span>9</span></label><label><input
        id="note-10" class="wd-notes" disabled name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="10"><span>10</span></label></div>
    <div id="post-vote" style="visibility: hidden;">
      <div>
          <textarea id="wd-nps-comment"
                    :style="`background-color: ${formValue.bgColor}; visibility: visible; opacity: 1;`"
                    cols="70" disabled
                    maxlength="240"
                    placeholder="Escreva um comentário sobre sua avaliação"
                    rows="5"></textarea>
      </div>
      <button id="wd-button-send" :style="`background-color: ${formValue.color}; visibility: visible; opacity: 1;`"
              disabled>
        Enviar
      </button>
      <button id="wd-button-skip" disabled style="visibility: visible; opacity: 1;">Não quero avaliar</button>
    </div>
    <div id="thumb">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            stroke-linecap="round" stroke-linejoin="round"
            stroke-width="1"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});
</script>

<style scoped>
#widget-nps-container {
  --wd-nps-font-family: v-bind('props.formValue.fontFamily');
  /*--wd-nps-font-color: '#f6f6f6';*/
  /*--wd-nps-font-size: v-bind('props.formValue.fontSize');*/
}

#wd-float-button {
  visibility: hidden;
  /*cursor: pointer;*/
  width: fit-content;
  height: 15px;
  /*position: fixed;*/
  border-radius: 7px;
  border: 1px solid silver;
  padding: 10px;
  z-index: 12;
  font-family: var(--wd-nps-font-family), monospace;
  font-weight: 700;
  font-size: 15px;
}

#widget-nps-container {
  visibility: hidden;
  opacity: 0;
  width: 400px;
  /*height: 250px;*/
  background-color: #fff;
  /*position: fixed;*/
  position: fixed;
  z-index: 10;
  border-radius: 7px;
  border: 1px solid #3c3c3c;
  padding: 10px;
  text-align: center;
  transition: all 0.4s ease-in-out;
  font-family: v-bind('formValue.fontFamily'), monospace;
  color: v-bind('formValue.fontColor');
}

#widget-nps-container.wd-nps-full {
  width: 510px;
  /*height: 380px;*/
}

#widget-nps-container h2 {
  margin-top: 0;
  margin-bottom: 0;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  font-family: v-bind('formValue.fontFamily'), monospace;
}

.wd-message-container {
  min-height: 20px;
  /*max-height: 150px;*/
  overflow-y: auto;
}

.wd-message-container::-webkit-scrollbar {
  width: 3px;
}

#wd-button-close {
  width: 21px;
  height: 21px;
  top: -7px;
  right: -6px;
  /*cursor: pointer;*/
  border: 1px solid #000;
  border-radius: 16px;
  position: absolute;
  font-family: var(--wd-nps-font-family), monospace;
}

#thumb {
  display: flex;
  opacity: 0;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  transition: all 1s ease-in-out;
}

#wd-button-container {
  margin-top: 5px;
  margin-bottom: 15px;
}

#wd-button-container label > span {
  /*cursor: pointer;*/
  position: relative;
  font-weight: 500;
  top: 1px;
  left: -23px;
}

#wd-button-container label:last-child > span {
  top: 1px;
  left: -26px;
}

#wd-nps-comment {
  visibility: hidden;
  opacity: 0;
  resize: none;
  margin: 5px auto 15px;
  width: 474px;
  padding: 10px;
  transition: opacity 1.2s ease-in-out;
  font-family: var(--wd-nps-font-family), monospace;
  color: var(--wd-nps-font-color);
  border-radius: 7px;
  border-color: initial;
  filter: brightness(1.20);
}

#wd-button-send, #wd-button-skip {
  opacity: 0;
  margin: 0 auto;
  width: 25%;
  height: 40px;
  border-radius: 7px;
  border: 1px solid v-bind('formValue.fontColor');
  font-weight: 700;
  font-size: 1em;
  /*cursor: pointer;*/
  transition: opacity 1.2s ease-in-out;
  font-family: var(--wd-nps-font-family), monospace;
  color: var(--wd-nps-font-color);
}

#wd-button-skip {
  border: 0;
  margin-left: 5px;
  width: fit-content;
  background-color: transparent;
}

.wd-notes {
  width: 31px;
  height: 31px;
  margin: 3px;
  /*cursor: pointer;*/
  appearance: none;
  border: 1px solid #000;
  border-radius: 16px;
  background-color: #fff;
  font-family: var(--wd-nps-font-family), monospace;
  color: var(--wd-nps-font-color);
}

.wd-notes:has(+ .wd-emoticons) {
  border: 0px;
}

#post-vote {
  visibility: hidden;
  /*width: 500px;*/
  background-color: red;
  /*height: 400px;*/
  /*position: fixed;*/
}

.wd-emoticons {
  top: -3px !important;
  left: -34px !important;
}

.wd-justification-message {
  font-size: small;
  color: #c52c2c;
  font-family: var(--wd-nps-font-family), monospace;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}
</style>