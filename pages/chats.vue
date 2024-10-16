<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "#imports";
import { useChatStore } from "~/stores/ChatStore";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useToast } from 'primevue/usetoast';

import type Chat from "~/types/chat";

import io from "socket.io-client";

const toastSuccess = useToast();
const toastError = useToast();
const toastErrorNameTooLarge = useToast();

const userStore = useUserStore();
const chatStore = useChatStore();

const router = useRouter();

const newChatName = ref("");
const newChatPassword = ref("");
const createChatLoading = ref(false);
const isCreateChatModalVisible = ref(false);

//TODO: esses computeds nao ajudam muito
const isNewChatPasswordInvalid = computed(() => newChatPassword.value.length > 50);
const isNewChatNameInvalid = computed(() => newChatName.value.length > 50);

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;
const baseUrl: string = import.meta.env.VITE_BASE_URL;

//TODO: cachear a lista de chats
onMounted(() => {
  // chatStore.updateChats();
})

const createChat = async () => {
  createChatLoading.value = true;

  if (newChatName.value.length > 50) {
    toastErrorNameTooLarge.add({ severity: 'error', summary: 'Error', life: 0, detail: 'Chat name cannot be longer than 50 characters, got:  ' + newChatName.value.length });
    createChatLoading.value = false;
    return;
  }

  createChatLoading.value = true;

  try {
    const response = await $fetch(apiBaseUrl + "/chats/", {
      method: "POST",
      body: {
        name: newChatName.value,
        password: newChatPassword.value,
        creator: `${userStore.username}`
      }
    })

    showSuccessToast();
    newChatName.value = "";
    newChatPassword.value = "";
    changeCreateChatModalVisibility(false);
  } catch (error) {
    console.error(error);
    createChatLoading.value = false;
    showErrorToast(error as string);
  } 
};

const showSuccessToast = () => {
  toastSuccess.add({ severity: 'success', summary: 'Chat Created', life: 5000 });
};

const showErrorToast = (message: string) => {
  toastError.add({ severity: 'error', summary: 'Error', life: 0, detail: message });
};

function changeCreateChatModalVisibility(value?: boolean) {
  if (value) {
    isCreateChatModalVisible.value = !isCreateChatModalVisible.value;
    return;
  }
  isCreateChatModalVisible.value = value!;

}

function handleKeyboardKeydown(event: KeyboardEvent) {
  if (event.repeat) return;
  if (event.key === "Escape") {
    if (isCreateChatModalVisible.value === true) {
      changeCreateChatModalVisibility(false);
      return;
    }
    chatStore.openChats = [];
  }
}

function modalCreateChatCloseButtonHandler() {
  changeCreateChatModalVisibility(false);
  newChatName.value = "";
}

document.addEventListener("keydown", (event) => {
  handleKeyboardKeydown(event);
});

const showSearchInput = () => { }

//TODO: change socket logic to use pinia, or try
const socket = io(baseUrl);
socket.on("chatCreated", (data) => {
  chatStore.chats.push(data);
})

const chatCardClickHandler = (chatObject: Chat) => {
  //TODO: isso é um mock
  const newSelectedChat = chatStore.chats.find((chat) => chat.id == chatObject?.id);
  if (!newSelectedChat) return
  if (chatStore.openChats.includes(newSelectedChat)) {
    chatStore.closeChat(newSelectedChat);
    return;
  }
  chatStore.openChats.push(newSelectedChat);
}

const login = () => {
  router.push("/login");
};

</script>

<template>
  <div class="message-container">
    <Message class="message" v-if="!userStore.isAuthenticated" severity="info"
      :pt:text:style="'padding: 0 1vw ; display: flex; align-items: center'"> Now authenticated as guest
      <Button @click="login" label="login" style="margin-left: 10px" />
    </Message>
  </div>
  <div class="container text-white">
    <section class="chat-cards-section blue-whale-alpha" :class="{ 'empty': chatStore.chats.length == 0 }">
      <div v-if="chatStore.chats.length == 0">
        <h2>There are no chats 😐 </h2>
        <Button @click="changeCreateChatModalVisibility(true)" label="new chat" icon="pi pi-plus" severity="success"
          style="width: 100%; margin-top: 10%;" />
      </div>

      <main v-else>
        <div class="menu card flex justify-content-center" style="margin-bottom: 2vh;">
          <ButtonGroup>
            <Button icon="pi pi-plus" @click="changeCreateChatModalVisibility(true)" />
            <Button icon="pi pi-search" />
            <Button icon="pi pi-cog" />
          </ButtonGroup>
        </div>
        <div class="chat-cards-container">
          <ChatCard :class="{ 'open-chats': chatStore.openChats.includes(chat) }" v-for="chat in chatStore.chats"
            @chat-card-click="(chatObject) => chatCardClickHandler(chatObject)" :chatObject="chat" />
        </div>
      </main>
    </section>
  </div>

  <!-- modal for creating new chat -->
  <Dialog dismissableMask :visible="isCreateChatModalVisible" modal header="Create new chat"
    :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }" :pt:title:style="'color:tomato;'"
    :pt:header:style="'color: white;'" :pt:closeButton:onClick="modalCreateChatCloseButtonHandler">
    <FloatLabel class="float-label">
      <label for="new-chat-name-input-text">Enter new chat name</label>
      <InputText class="input-text" id="new-chat-name-input-text" type="text" :pt:root:autofocus="true"
        :invalid="isNewChatNameInvalid" v-model="newChatName"
        @keydown.enter="($event) => { if ($event.repeat) return; createChat() }" />
    </FloatLabel>

    <FloatLabel class="float-label">
      <label for="new-chat-password-input-text">Enter password</label>
      <InputText class="input-text" id="new-chat-password-input-text" type="text" :invalid="isNewChatPasswordInvalid"
        v-model="newChatPassword" @keydown.enter="($event) => { if ($event.repeat) return; createChat() }" />
    </FloatLabel>
    <template #footer>
      <Button @click="createChat" :loading="createChatLoading" label="Create" severity="success" icon="pi pi-check" />
    </template>

  </Dialog>

  <ChatModal :key="chat.id" v-for="chat in chatStore.openChats" :visible="chatStore.openChats.includes(chat)"
    :chat="chat" :socket="socket" @click="console.log('oi')" />

  <Toast position="bottom-left" />
</template>

<style scoped>
a {
  color: white;
}

.open-chats {
  transform: translate3d(-5px, -5px, 0) !important;
  box-shadow: rgba(236, 233, 4, 0.4) 5px 5px, rgba(24, 187, 65, 0.3) 10px 10px,
    rgba(51, 211, 2, 0.2) 15px 15px, rgba(46, 240, 208, 0.1) 20px 20px,
    rgba(139, 106, 231, 0.1) 25px 25px !important;

}

.open-chats:hover {
  box-shadow: rgba(236, 233, 4, 0.5) 5px 5px, rgba(24, 187, 65, 0.4) 10px 10px,
    rgba(51, 211, 2, 0.3) 15px 15px, rgba(46, 240, 208, 0.2) 20px 20px,
    rgba(139, 106, 231, 0.2) 25px 25px !important;
}

/* .messages-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
} */

.message-container {
  position: absolute;
  right: 0;
  margin: 1vh;
}

@media (min-width: 1200px) {

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10vh 5vw;
    min-height: 88vh;
  }

  .chat-cards-section {

    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(5, 1fr);
    gap: 1vw;

    box-sizing: border-box;
  }

  #menu {
    margin: 0 2%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}


@media (min-width: 768px) and (max-width: 979px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8vh 5vw;
    min-height: 50vh;

  }

  .chat-cards-section {

    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    /* border: 10px solid blue; */
    display: grid;
    justify-items: center;
    /* align-items: center; */
    grid-template-columns: repeat(3, 1fr);
    gap: 3vw;
    padding: 0 2vw 5vh 2vw;
  }

  .menu {
    margin: 1vh 2vw;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}


@media (max-width: 767px) {

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8vh 5vw;
    min-height: 50vh;

  }

  .chat-cards-section {

    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    /* border: 10px solid blue; */
    display: grid;
    justify-items: center;
    /* align-items: center; */
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    padding: 0 2vw 5vh 2vw;
  }

  .chat-card {}

  .menu {
    margin: 1vh 2vw;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}


@media (max-width: 480px) {
  .menu {
    margin-top: 1vh;
    margin-right: 2vw;
    display: flex;
    justify-content: end;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    justify-content: space-between;
    margin: 9vh 2vw;
    /* border: 1px solid green; */
    min-height: 89vh;

  }

  .chat-cards-container {
    /* border: 10px solid tomato; */
    padding: 0 2vw 5vh 2vw;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    /* justify-items: center; */
    /* align-items: center; */
    /* box-sizing: border-box; */

  }

  .chat-cards-section {
    border-radius: 10px;

    margin: 0;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

}
</style>
