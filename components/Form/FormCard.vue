<template>
    <div
      class="!h-screen relative flex justify-center"
    >
    <!-- Card -->
    <div class="flex flex-col mt-5">
    <div>
        <img
            class="cursor-pointer"
            src="~/assets/icon/color.svg"
            alt="color"
            @click="triggerColorPicker"
        />

        <el-color-picker
            ref="colorPickerRef"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            style="display: none;"
            @change="changeMainColor"
        />
    </div>
    <div class="bg-white rounded-2xl w-[750px] mt-10">
        <FormHeader />
        <FormDraftableCard />
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const color = ref('#B2E5FF');
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
]);

const colorPickerRef = ref(null);

const triggerColorPicker = () => {
    if (colorPickerRef.value) {
        colorPickerRef.value.show();
    }
};

const changeMainColor = () => {
  document.documentElement.style.setProperty('--default-background-color', color.value);
};
</script>

<style lang="css" >
.el-popper.is-light.el-color-picker__panel.el-color-dropdown{
    left: 23% !important;
    top: 5% !important;
}
</style>
