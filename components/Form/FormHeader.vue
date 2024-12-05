<template>
    <div class="p-7 border-b ">
        <div class="flex justify-between p-[5px] ">
            <h1 class="p-[5px] text-[30px] font-bold" >
                Better Form
            </h1>
            <div class="p-[5px] flex flex-col gap-y-4 " >
                <el-button type="primary"  @click="$router.push('/preview')" >Preview</el-button>
                <!-- <el-button class="flex items-center !px-10 " >
                    <img src="~/assets/icon/share.svg" alt="share" class="mr-2"  >
                    <span class="inline-block mt-1" >
                        Share
                    </span>
                </el-button> -->
            </div>
        </div>
        
        <h2 class=" p-[5px] text-[#00000073] text-[20px] font-semibold min-h-[64px] " >
            Add a Description
        </h2>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>