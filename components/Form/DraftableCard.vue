<template>
  <Container
    v-for="(group, index) in groups"
    :key="`container-${index}`"
    :data-index="index"
    group-name="column"
    :get-child-payload="(itemIndex) => getChildPayload(index, itemIndex)"
    :should-accept-drop="
      (src, payload) => getShouldAcceptDrop(index, src, payload)
    "
    :should-animate-drop="
      (src, payload) => getShouldAnimateDrop(index, src, payload)
    "
    @drag-start="onDragStart"
    @drag-enter="onDragEnter(index)"
    @drag-leave="onDragLeave(index)"
    @drag-end="onDragEnd"
    @drop-not-allowed="dropNotAllowed"
    @drop="onDrop(index, $event)"
  >
    <Draggable v-for="(item, index) in group" :key="item.id">
      <div v-if="!item.isHidden" class="draggable-item border-b p-[20px]">
        <div class="flex gap-6 justify-end items-center " >
          <div>
            <el-checkbox @change="checkConditionHandler(item)" v-model="item.conditional" label="Conditional Question" size="large" />
          </div>
          <div>
            <el-checkbox @change="checkRequireHandler(item)" v-model="item.Required" label="Required" size="large" />
          </div>
          <div>
            <el-button
              link
              @click="hiddenForm(item)"
            >
              <img src="~/assets/icon/eye.svg" alt="eye_icon">
            </el-button>
          </div>
          <div>
            <img src="~/assets/icon/setting.svg" alt="setting">
          </div>
        </div>
        <h1 class="text-[18px] font-medium pb-[24px] pl-[24px] " >
          {{ item.title }}
          <span v-if="item.required" class="text-[14px] text-[#FF0000] " >*</span>
        </h1>
        <div v-if="item.condition" class="border p-[10px] w-[90%] rounded-xl mx-auto ">
          <h3 class="text-center text-[#000000E0] font-semibold  " >Show this field only when :</h3>
          <div class="text-center py-[10px] " >
            <span
            class="mx-[10px]">
              Field
            </span>
            <el-select
              v-model="selected_field_value"
              style="width: 150px"
              class="mx-[10px]"
            >
              <el-option
                v-for="item in fields"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span
            class="mx-[10px]">
              equals to one of
            </span>
            <el-select
              v-model="selected_field_value_type"
              style="width: 150px"
              class="mx-[10px]"
            >
              <el-option
                v-for="item in fields_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="min-h-[64px] mx-[30px]  " >
          <div 
            @click="showInputField(index)" 
           
            v-if="!activeInputFields.includes(index)" 
            class="hover:bg-[#0000000A] min-h-[64px] cursor-pointer p-[5px] 
          ">
            <p class="!text-[#00000073]">
              {{  item.text_field ? item.text_field : 'Add a description'  }}
            </p>
          </div>
          <div v-else  >
            <el-input
              v-model="item.text_field"
              class="w-full !h-[64px] "
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </div>
          <div class="ml-36 " >
            <el-input
                v-model="answer_disabled"
                class="!w-full"
                disabled
                placeholder="Answer will be written here"
              />
          </div>
        </div>
      </div>
      <div v-else class="draggable-item border-b p-[20px] flex justify-between items-center " >
        <h1 class="text-[18px] font-medium  " >
          {{ item.title }}
          <span class="!font-normal"  >
            is hidden on this form
          </span>
        </h1>
        <div class="" >
          <el-button
            link
            @click="hiddenForm(item)"
          >
            <img src="~/assets/icon/eye.svg" alt="eye_icon">
          </el-button>
        </div>
      </div>
    </Draggable>
  </Container>
</template>
  
<script setup>
import { ref, reactive, onMounted } from "vue";
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "~/utils/helpers.js";
import TableDatas from "~/static/TableDatas.json"
import { useTableStore } from '~/store/tableStore.js'

const { setToTableStore } = useTableStore()
const { table } = useTableStore()
const answer_disabled = ref("");
const inputFieldOrNot = ref("value_text");
const selected_field_value = ref("");
const selected_field_value_type = ref("");
const fields = reactive([
  { value: "field1", label: "Status" },
  { value: "field2", label: "Priority" },
]);
const fields_type = reactive([
  { value: "field1", label: "Working on it" },
  { value: "field2", label: "Done" },
  { value: "field3", label: "Block" },
  { value: "field4", label: "Stuck" },
]);

const activeInputFields = ref([]);

const showInputField = (index) => {
  console.log("index", index)
  // return inputFieldOrNot.value = inputFieldOrNot.value === "value_text"? "input_field" : "value_text";
  if (!activeInputFields.value.includes(index)) {
    activeInputFields.value.push(index);
  }
  console.log("activeInputFields", activeInputFields.value)
}

const hiddenForm = (field) => {
  const target = groups.value[0].find((group) => group.id === field.id);
  if (target) {
      target.isHidden = !target.isHidden;
  }
  setToTableStore(groups.value[0])
}

const checkConditionHandler = (field) => {
  const target = groups.value[0].find((group) => group.id === field.id);
  console.log("targetC", target)
  if (target) {
      target.condition = !target.condition;
  }
  console.log("groups", groups);
}

const checkRequireHandler = (field) => {
  const target = groups.value[0].find((group) => group.id === field.id);
  console.log("targetR", target)
  if (target) {
      target.required =!target.required;
  }
  setToTableStore(groups.value[0])
}
//   let i = 0;
  
//   function id() {
//     return `item-${++i}`;
//   }
  
//   function generate(num) {
//     return generateItems(5, (i) => ({
//       id: id(),
//       data: `Draggable ${num} - ${i + 1}`,
//     }));
//   }

const groups = ref([]);
const flags = ref([]);
const logs = reactive({
  "get-child-payload": true,
  "should-accept-drop": false,
  "should-animate-drop": false,
  "drag-start": true,
  "drag-end": true,
  "drag-enter": true,
  "drag-leave": true,
  "drop-not-allowed": true,
  drop: true,
});
const logPayload = ref(true);

const getChildPayload = (groupIndex, itemIndex) => {
  log("get-child-payload", groupIndex, itemIndex);
  return groups.value[groupIndex][itemIndex];
};

const getShouldAcceptDrop = (index, sourceContainerOptions, payload) => {
  log("should-accept-drop", sourceContainerOptions, payload);
  return flags.value[index].drop;
};

const getShouldAnimateDrop = (index, sourceContainerOptions, payload) => {
  log("should-animate-drop", sourceContainerOptions, payload);
  return flags.value[index].animate;
};

const onDragStart = (...args) => {
  log("drag-start", ...args);
};

const onDragEnd = (...args) => {
  log("drag-end", ...args);
};

const onDragEnter = (...args) => {
  log("drag-enter", ...args);
};

const onDragLeave = (...args) => {
  log("drag-leave", ...args);
};

const onDrop = (groupIndex, dropResult) => {
  const result = applyDrag(groups.value[groupIndex], dropResult);
  groups.value[groupIndex] = result;
  setToTableStore(groups.value[0])
  log("drop", dropResult);
};

const dropNotAllowed = (...args) => {
  log("drop-not-allowed", ...args);
};

const addColumn = () => {
  // groups.value.push(generate(groups.value.length + 1));
  if(!table.length){
    groups.value.push(TableDatas.data.boards[0].columns)
  }
  if(table.length){
    groups.value.push(table)
  }
  flags.value.push({ drop: true, animate: true });
};

const removeColumn = () => {
  groups.value.pop();
  flags.value.pop();
};

const log = (name, ...args) => {
  if (logs[name]) {
    logPayload.value ? console.log(name, ...args) : console.log(name);
  }
};

onMounted(() => {
  addColumn();
});
</script>
  
<style scoped>
.draggable-item {
  cursor: grab;
}
</style>