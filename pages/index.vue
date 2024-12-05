<template>
    <div>
      <FormCard />
      <div>
        <p>CPU Usage: {{ stats.cpu }}%</p>
        <p>Memory Usage: {{ stats.memory }} MB</p>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';

const stats = ref({ cpu: 0, memory: 0 });

onMounted(() => {
setInterval(async () => {
    try {
    const response = await fetch("/api/cpu-usage");
    const data = await response.json();
    if (!data.error) {
        stats.value = data;
    }
    console.log("Cpu Data Usage", data)
    } catch (error) {
    console.error('Error fetching CPU stats:', error);
    }
}, 1000);
});
</script>
