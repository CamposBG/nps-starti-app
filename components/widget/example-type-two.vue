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
    <div id="wd-button-container" style="visibility: visible; opacity: 1;"><label><input id="note-1" class="wd-notes"
                                                                                         name="note"
                                                                                         style="background-color: rgb(255, 255, 255);"
                                                                                         type="radio"
                                                                                         value="1"><span
        class="wd-emoticons"><svg height="31" version="1.1" viewBox="0 0 31 31" width="31" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.06 0 0 0.06 16.24 16.24)"><path d="M 169.6 291.3 C 172.8 286.9 179.2 286.9 182.4 291.3 C 195.6 308.6 223.1 349 223.1 369 C 223.1 395 202.5 416 175.1 416 C 149.5 416 127.1 395 127.1 369 C 127.1 349 156.6 308.6 169.6 291.3 H 169.6 z M 368 346.8 C 377.9 355.6 378.7 370.8 369.9 380.7 C 361 390.6 345.9 391.4 335.1 382.6 C 314.7 363.5 286.7 352 256 352 C 242.7 352 232 341.3 232 328 C 232 314.7 242.7 304 256 304 C 299 304 338.3 320.2 368 346.8 L 368 346.8 z M 335.6 176 C 353.3 176 367.6 190.3 367.6 208 C 367.6 225.7 353.3 240 335.6 240 C 317.1 240 303.6 225.7 303.6 208 C 303.6 190.3 317.1 176 335.6 176 z M 175.6 240 C 157.1 240 143.6 225.7 143.6 208 C 143.6 190.3 157.1 176 175.6 176 C 193.3 176 207.6 190.3 207.6 208 C 207.6 225.7 193.3 240 175.6 240 z M 256 0 C 397.4 0 512 114.6 512 256 C 512 397.4 397.4 512 256 512 C 114.6 512 0 397.4 0 256 C 0 114.6 114.6 0 256 0 z M 175.9 448 C 200.5 458.3 227.6 464 256 464 C 370.9 464 464 370.9 464 256 C 464 141.1 370.9 48 256 48 C 141.1 48 48 141.1 48 256 C 48 308.7 67.59 356.8 99.88 393.4 C 110.4 425.4 140.9 447.9 175.9 448 V 448 z" stroke-linecap="round" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-256, -256)" vector-effect="non-scaling-stroke"></path></g></svg></span></label><label><input
        id="note-2" class="wd-notes" name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="2"><span class="wd-emoticons"><svg height="31" version="1.1" viewBox="0 0 31 31" width="31" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.06 0 0 0.06 15.75 15.75)"><path d="M 144.4 208 C 144.4 190.3 158.7 176 176.4 176 C 194 176 208.4 190.3 208.4 208 C 208.4 225.7 194 240 176.4 240 C 158.7 240 144.4 225.7 144.4 208 z M 368.4 208 C 368.4 225.7 354 240 336.4 240 C 318.7 240 304.4 225.7 304.4 208 C 304.4 190.3 318.7 176 336.4 176 C 354 176 368.4 190.3 368.4 208 z M 192 352 C 192 316.7 220.7 288 256 288 C 291.3 288 320 316.7 320 352 C 320 387.3 291.3 416 256 416 C 220.7 416 192 387.3 192 352 z M 512 256 C 512 397.4 397.4 512 256 512 C 114.6 512 0 397.4 0 256 C 0 114.6 114.6 0 256 0 C 397.4 0 512 114.6 512 256 z M 256 48 C 141.1 48 48 141.1 48 256 C 48 370.9 141.1 464 256 464 C 370.9 464 464 370.9 464 256 C 464 141.1 370.9 48 256 48 z" stroke-linecap="round" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-256, -256)"></path></g></svg></span></label><label><input
        id="note-3" class="wd-notes" name="note" style="background-color: #fad83b;" type="radio"
        value="3"><span class="wd-emoticons"><svg height="31" version="1.1" viewBox="0 0 31 31" width="31" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.06 0 0 0.06 16 16)"><path d="M 144.4 208 C 144.4 190.3 158.7 176 176.4 176 C 194 176 208.4 190.3 208.4 208 C 208.4 225.7 194 240 176.4 240 C 158.7 240 144.4 225.7 144.4 208 z M 368.4 208 C 368.4 225.7 354 240 336.4 240 C 318.7 240 304.4 225.7 304.4 208 C 304.4 190.3 318.7 176 336.4 176 C 354 176 368.4 190.3 368.4 208 z M 328 328 C 341.3 328 352 338.7 352 352 C 352 365.3 341.3 376 328 376 H 184 C 170.7 376 160 365.3 160 352 C 160 338.7 170.7 328 184 328 H 328 z M 512 256 C 512 397.4 397.4 512 256 512 C 114.6 512 0 397.4 0 256 C 0 114.6 114.6 0 256 0 C 397.4 0 512 114.6 512 256 z M 256 464 C 370.9 464 464 370.9 464 256 C 464 141.1 370.9 48 256 48 C 141.1 48 48 141.1 48 256 C 48 370.9 141.1 464 256 464 z" stroke-linecap="round" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-256, -256)"></path></g></svg></span></label><label><input
        id="note-4" class="wd-notes" name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="4"><span class="wd-emoticons"><svg height="31" version="1.1" viewBox="0 0 31 31" width="31" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.06 0 0 0.06 15.75 15.75)"><path d="M 349.5 308.4 C 368.2 303.1 385.4 320.4 374.1 336.5 C 350.4 374.6 306.3 399.1 255.9 399.1 C 205.6 399.1 161.5 374.6 136.9 336.5 C 126.5 320.4 143.7 303.1 162.3 308.4 C 191.3 315.1 222.8 318.8 255.9 318.8 C 289 318.8 320.6 315.1 349.5 308.4 z M 224 192 C 224 227.3 209.7 256 192 256 C 174.3 256 160 227.3 160 192 C 160 156.7 174.3 128 192 128 C 209.7 128 224 156.7 224 192 z M 288 192 C 288 156.7 302.3 128 320 128 C 337.7 128 352 156.7 352 192 C 352 227.3 337.7 256 320 256 C 302.3 256 288 227.3 288 192 z M 512 256 C 512 397.4 397.4 512 256 512 C 114.6 512 0 397.4 0 256 C 0 114.6 114.6 0 256 0 C 397.4 0 512 114.6 512 256 z M 256 48 C 141.1 48 48 141.1 48 256 C 48 370.9 141.1 464 256 464 C 370.9 464 464 370.9 464 256 C 464 141.1 370.9 48 256 48 z" stroke-linecap="round" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-256, -256)"></path></g></svg></span></label><label><input
        id="note-5" class="wd-notes" name="note" style="background-color: rgb(255, 255, 255);" type="radio"
        value="5"><span class="wd-emoticons"><svg height="31" version="1.1" viewBox="0 0 31 31" width="31" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(0.06 0 0 0.06 15.75 15.75)"><path d="M 256 352 C 293.2 352 319.2 334.5 334.4 318.1 C 343.3 308.4 358.5 307.7 368.3 316.7 C 378 325.7 378.6 340.9 369.6 350.6 C 347.7 374.5 309.7 400 256 400 C 202.3 400 164.3 374.5 142.4 350.6 C 133.4 340.9 133.1 325.7 143.7 316.7 C 153.5 307.7 168.7 308.4 177.6 318.1 C 192.8 334.5 218.8 352 256 352 z M 208.4 208 C 208.4 225.7 194 240 176.4 240 C 158.7 240 144.4 225.7 144.4 208 C 144.4 190.3 158.7 176 176.4 176 C 194 176 208.4 190.3 208.4 208 z M 281.9 230.6 C 273.9 223 273.5 210.4 281 202.3 C 295.6 186.8 316.3 180 335.6 180 C 354.1 180 375.7 186.8 390.2 202.3 C 397.8 210.4 397.4 223 389.3 230.6 C 381.2 238.1 368.6 237.7 361 229.7 C 355.6 223.8 346.3 220 335.6 220 C 324.1 220 315.7 223.8 310.2 229.7 C 302.7 237.7 290 238.1 281.9 230.6 z M 512 256 C 512 397.4 397.4 512 256 512 C 114.6 512 0 397.4 0 256 C 0 114.6 114.6 0 256 0 C 397.4 0 512 114.6 512 256 z M 256 48 C 141.1 48 48 141.1 48 256 C 48 370.9 141.1 464 256 464 C 370.9 464 464 370.9 464 256 C 464 141.1 370.9 48 256 48 z" stroke-linecap="round" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-256, -256)"></path></g></svg></span></label>
    </div>
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
  width: 450px;
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
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  gap: 25px;
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
  top: -34px !important;
  left: 2.5px !important;
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