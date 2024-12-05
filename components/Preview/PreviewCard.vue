<template>
    <div class="w-full h-full flex justify-center " >
        <div class="flex flex-col " >
            <div class="w-[750px] bg-white rounded-2xl mt-10 py-[32px] my-[32px] px-[25px] flex flex-col "  >
                <h1 class="text-[30px] font-bold" >
                    Better Form
                </h1>
    
                <h2 class="text-[#00000073] text-[20px] min-h-[64px] " >
                    Manage any type of project. Assign owners, set timelines and keep track of where your project stands.
                </h2>
    
                <div v-for="(preview, index) in previewRawData"  >
                    <div :key="index" class="mt-5" v-if="!preview.isHidden">
                        <h1 class="text-[18px] font-medium mb-2 " >
                            {{ preview.title }}
                            <span v-if="preview.required" class="text-[14px] text-[#FF0000] " >*</span>
                        </h1>
                        <p class="text-[14px] text-[#808080] mb-5 " >
                            {{ preview.text_field }}
                        </p>
    
                        <!-- Name Type -->
                        <div v-if="preview.type === 'name' || preview.type ==='link' || preview.type === 'text' || preview.type === 'number' " >
                            <el-input :type="preview.type === 'number'? 'number' : 'text' "  v-model="preview.monday_value" size="large" :placeholder="preview.type === 'name'? 'Incoming from answer' : ''" />
                        </div>

                        <!-- Update -->
                        <div v-if="preview.type === 'update'"  >
                            <el-input
                                v-model="preview.monday_value"
                                class="w-full !h-[75px] "
                                :rows="3"
                                type="textarea"
                            />
                        </div>
    
                        <!-- Status Type -->
                        <div v-if="preview.type === 'status'" >
                            <el-select
                                v-model="preview.monday_value"
                                placeholder="Select"
                                size="large"
                                style="width: 320px"
                            >
                                <el-option
                                    v-for="item in preview.options"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
    
                        <!-- Date Type -->
                        <div v-if="preview.type === 'date' " >
                            <el-date-picker
                                v-model="preview.monday_value"
                                type="date"
                                placeholder="Select date"
                                size="large"
                            />
                        </div>
    
                        <!-- Date Range -->
                        <div v-if="preview.type === 'timeline'" >
                            <el-date-picker
                                v-model="preview.monday_value"
                                type="daterange"
                                range-separator="To"
                                start-placeholder="Start date"
                                end-placeholder="End date"
                                placeholder="Select date"
                                size="large"
                                class="!w-full"
                            />
                        </div>
    
                        <!-- Files Upload -->
                        <div v-if="preview.type === 'file'">
                            <el-upload
                                class="upload-demo"
                                drag
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                multiple
                            >
                                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                                <div class="el-upload__text">
                                    Drop file here or <em>click to upload</em>
                                </div>
                                <template #tip>
                                    <!-- <div class="el-upload__tip">
                                        jpg/png files with a size less than 500kb
                                    </div> -->
                                </template>
                            </el-upload>
                        </div>
    
                        <!-- People -->
                        <div v-if="preview.type === 'people' || preview.type === 'dropdown' " >
                            <el-select
                                v-model="preview.monday_value"
                                placeholder="Select"
                                size="large"
                                style="width: 320px"
                                multiple
                            >
                                <el-option v-if="preview.type === 'people'" disabled value="user"/>
                                <el-option
                                    v-for="item in preview.options"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
    
                        <!-- Checkbox -->
                        <div v-if="preview.type === 'checkbox'"  >
                            <el-checkbox v-model="preview.monday_value" size="large" />
                        </div>
    
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="text-center my-10 "  >
                    <el-button type="primary" >
                        Submit
                    </el-button>
                </div>
            </div>
            <div class="text-center mb-[32px]">
                <p class="text-white"   >Powered by</p>
                <img class="mx-auto mt-5 " src="@/assets/icon/better-logo.svg" alt="betterhr_logo">
            </div>
        </div>
    </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
// import TableDatas from "~/static/TableDatas.json"
import { useTableStore } from '~/store/tableStore.js'

const { table } = useTableStore()

const previewRawData = ref([])

onMounted(()=> {
    console.log("table from store", table)
    previewRawData.value = table
    // previewRawData.value = TableDatas.data.boards[0].columns
    console.log("table data1", previewRawData.value )
})
</script>

<style>

</style>