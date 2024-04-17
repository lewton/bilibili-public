/*=============== RANGE SLIDER JS ===============*/
const rangeThumb = document.getElementById("range-thumb"),
  rangeNumber = document.getElementById("range-number"),
  rangeLine = document.getElementById("range-line"),
  rangeInput = document.getElementById("range-input");

const rangeInputSlider = () => {
  // 插入输入范围的值
  rangeNumber.textContent = rangeInput.value;

  // 计算输入滑动的位置
  // rangeInput.value = 50, rangeInput.max = 100, (50 / 100 = 0.5)
  // rangeInput.offsetWidth = 248, rangeThumb.offsetWidth = 32, (248 - 32 = 216)
  const thumbPosition = rangeInput.value / rangeInput.max,
    space = rangeInput.offsetWidth - rangeThumb.offsetWidth;

  // 我们插入输入滑动的位置
  // thumbPosition = 0.5, space = 216 (0.5 * 216 = 108)
  rangeThumb.style.left = thumbPosition * space + "px";

  // 我们将输入值的值插入滑块的宽度
  // rangeInput.value = 50, ancho = 50%
  rangeLine.style.width = rangeInput.value + "%";

  rangeInput.addEventListener("input", rangeInputSlider);
};

rangeInputSlider();
