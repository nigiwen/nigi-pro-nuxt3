import { acceptHMRUpdate, defineStore } from 'pinia'

export interface FormState {
  username?: string
  password?: string
  remember?: boolean
}

export const useUserStore = defineStore(
  'user',
  () => {
  /**
   * Current named of the user.
   */
    const savedName = ref<FormState>()
    const previousNames = ref(new Set<FormState>())

    const usedNames = computed(() => Array.from(previousNames.value))
    const otherNames = computed(() => usedNames.value.filter(name => name.username !== savedName.value?.username))

    /**
     * Changes the current name of the user and saves the one that was used
     * before.
     *
     * @param name - new name to set
     */
    function setNewName(name: FormState) {
      if (savedName.value)
        previousNames.value.add(savedName.value)

      savedName.value = name
    }

    function removeName() {
      savedName.value = undefined
    }

    return {
      setNewName,
      otherNames,
      savedName,
      removeName,
    }
  },
  {
    persist: true,
  },
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
