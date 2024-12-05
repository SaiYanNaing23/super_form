import { defineStore } from 'pinia'


export const useTableStore = defineStore('tableStore', {
   state: ()=>(
    {
        table :[],
    }
   ),
   actions: {
    setToTableStore(data){
        console.log(data)
        this.table = data
    },
    getCurrencySettings(data) {
      this.currenciesSetting = data
    }
  },
  })

