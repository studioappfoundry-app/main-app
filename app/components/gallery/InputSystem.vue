<script setup>
import { ref } from "vue";
import Input from "./Input.vue";
import { Search } from "~/utils/icons";

const projectName = ref("");
const email = ref("");
const password = ref("");
const birthDate = ref("");
const budget = ref("");

const chatText = ref("");
const search = ref("");
</script>

<template>
  <div class="flex flex-col w-full gap-4">
    <!-- Text biasa -->
    <Input
      v-model="projectName"
      type="text"
      label="Project name"
      placeholder="e.g. Website refresh"
      :hint="
        projectName.length > 0
          ? 'Looks good.'
          : 'Use a short, descriptive name.'
      "
    />

    <!-- Email -->
    <Input
      v-model="email"
      type="email"
      label="Email address"
      placeholder="you@company.com"
    />

    <!-- Password -->
    <Input
      v-model="password"
      type="password"
      label="Password"
      placeholder="Min. 8 characters"
    />

    <!-- Search dengan icon kiri & kanan -->
    <Input
      v-model="search"
      type="search"
      label="Search"
      placeholder="Search projects..."
    >
      <template #icon-left>
        <Search />
      </template>
    </Input>

    <!-- Date -->
    <Input v-model="birthDate" type="date" label="Start date" />

    <!-- Number -->
    <Input
      v-model="budget"
      type="number"
      label="Budget (Rp)"
      currencyPrefix="Rp"
      placeholder="0"
    />

    <Input
      v-model="chatText"
      type="textarea"
      label="AI Chatbot"
      maxWidth="400px"
      class="chat-padding"
    />

    <!-- Error state -->
    <Input
      v-model="email"
      type="email"
      label="Email"
      error="Please enter a valid email address."
    />

    <!-- Small size -->
    <Input v-model="projectName" type="text" label="Quick input" size="sm" />
  </div>
</template>
