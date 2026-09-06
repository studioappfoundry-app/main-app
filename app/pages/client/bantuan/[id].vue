<template>
  <Transition name="drawer">
    <div
      v-if="showMobileInfo"
      class="fixed inset-0 z-50 lg:hidden"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        @click="showMobileInfo = false"
      ></div>

      <!-- Drawer Panel -->
      <div
        class="drawer-panel absolute right-0 top-0 bottom-0 w-[88vw] max-w-[380px] bg-card border-l border-border shadow-2xl overflow-hidden flex flex-col"
      >
        <!-- Drawer Header -->
        <div
          class="shrink-0 px-5 py-4 border-b border-border flex items-center justify-between bg-background"
        >
          <h3 class="text-base font-bold text-foreground">Informasi Bantuan</h3>
          <button
            @click="showMobileInfo = false"
            class="w-8 h-8 rounded-lg bg-surface-soft border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="flex-1 overflow-y-auto p-5 space-y-5">
          <!-- Status Tracker -->
          <div
            class="bg-background border border-border rounded-2xl p-5 shadow-app space-y-4"
          >
            <h3 class="text-base font-bold text-foreground">Status Ticket</h3>
            <Stepper
              :steps="statusSteps"
              direction="vertical"
              size="sm"
              :current-step="currentStep"
            />
          </div>

          <!-- Ticket Details -->
          <div
            class="bg-background border border-border rounded-2xl p-5 shadow-app space-y-4"
          >
            <h3 class="text-base font-bold text-foreground">Detail Ticket</h3>
            <div class="space-y-3 text-xs">
              <div
                class="flex justify-between items-center py-2 border-b border-border"
              >
                <span class="text-secondary">ID Ticket</span>
                <span class="font-mono font-semibold text-foreground">{{
                  ticket.id
                }}</span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-border"
              >
                <span class="text-secondary">Kategori</span>
                <span class="font-medium text-foreground capitalize">{{
                  ticket.category
                }}</span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-border"
              >
                <span class="text-secondary">Prioritas</span>
                <Badge :variant="priorityBadge.variant" size="sm">{{
                  priorityBadge.label
                }}</Badge>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-border"
              >
                <span class="text-secondary">Project</span>
                <span class="font-medium text-foreground">kedaisenja.com</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-secondary">Dibuat Oleh</span>
                <div class="flex items-center gap-2">
                  <div
                    class="w-5 h-5 rounded-full bg-primary-soft flex items-center justify-center text-[8px] font-bold text-primary"
                  >
                    KK
                  </div>
                  <span class="font-medium text-foreground"
                    >Kedai Kopi Senja</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div
            class="bg-background border border-border rounded-2xl p-5 shadow-app space-y-3"
          >
            <h3 class="text-base font-bold text-foreground">Tindakan Cepat</h3>
            <Button
              variant="soft-primary"
              size="md"
              class="w-full justify-center"
            >
              <div class="flex items-center gap-2">
                <FileText class="w-4 h-4" />
                Unduh Riwayat (PDF)
              </div>
            </Button>
            <Button
              variant="soft-warning"
              size="md"
              class="w-full justify-center"
              @click="navigateTo('/client/bantuan')"
            >
              <div class="flex items-center gap-2">
                <ArrowLeft class="w-4 h-4" />
                Kembali ke Daftar
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground hidden lg:block">
    <Breadcumb :items="breadcrumbItems" />

    <!-- Header Ticket -->
    <div
      class="mb-4 lg:mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4"
    >
      <div class="space-y-2 min-w-0">
        <div class="flex items-center gap-2 lg:gap-3 flex-wrap">
          <h1
            class="text-xl lg:text-2xl font-bold tracking-tight text-foreground truncate"
          >
            {{ ticket.subject }}
          </h1>
          <div class="flex items-center gap-1.5 shrink-0">
            <Badge :variant="statusBadge.variant" size="sm">{{
              statusBadge.label
            }}</Badge>
            <Badge :variant="priorityBadge.variant" size="sm">{{
              priorityBadge.label
            }}</Badge>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs text-secondary flex-wrap">
          <span class="font-mono text-muted">{{ ticket.id }}</span>
          <span>•</span>
          <span class="capitalize">{{ ticket.category }}</span>
          <span class="hidden sm:inline">•</span>
          <span class="hidden sm:inline"
            >Dibuat {{ formatDate(ticket.created_at) }}</span
          >
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
      <!-- Chat Section -->
      <div class="lg:col-span-8">
        <div
          class="bg-card border border-border rounded-2xl shadow-app overflow-clip flex flex-col max-h-[100vh] h-auto"
        >
          <!-- Chat Header -->
          <div
            class="sticky top-[64px] px-4 lg:px-6 py-3 lg:py-4 border-b border-border flex items-center justify-between bg-background shrink-0 z-10"
          >
            <div class="flex items-center gap-2">
              <MessageCircle class="w-4 h-4 text-primary" />
              <h3 class="text-sm font-bold text-foreground">Percakapan</h3>
              <span class="text-xs text-muted"
                >({{ messages.length }} pesan)</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-success"
                  ></span>
                </span>
              </div>
              <!-- Mobile Info Toggle -->
              <button
                class="lg:hidden ml-1 p-2 rounded-lg bg-surface-soft text-muted hover:text-foreground transition-colors"
                @click="showMobileInfo = true"
              >
                <Info class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Messages Container -->
          <div
            class="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5 lg:space-y-6 overflow-auto touch-pan-y scroll-smooth"
            ref="messageContainer"
          >
            <div v-for="msg in messages" :key="msg.id" class="relative">
              <!-- System Message -->
              <div
                v-if="msg.type === 'system'"
                class="flex justify-center my-3 lg:my-4"
              >
                <span
                  class="px-3 py-1 rounded-full bg-surface-soft border border-border text-[11px] text-muted"
                >
                  {{ msg.message }}
                </span>
              </div>

              <!-- User Message (Right) -->
              <div
                v-else-if="msg.user_id === currentUserId"
                class="flex items-end justify-end gap-2.5 lg:gap-3"
              >
                <div
                  class="max-w-[85%] sm:max-w-[75%] lg:max-w-[80%] space-y-1"
                >
                  <div
                    class="bg-primary text-background px-4 lg:px-5 py-2.5 lg:py-3 rounded-2xl rounded-br-sm shadow-sm"
                  >
                    <p class="text-sm leading-relaxed">{{ msg.message }}</p>
                    <div
                      v-if="msg.attachments?.length"
                      class="flex flex-wrap gap-2 mt-2.5 pt-2.5 border-t border-white/20"
                    >
                      <div
                        v-for="(att, aidx) in msg.attachments"
                        :key="aidx"
                        class="flex items-center gap-1.5 text-[11px] text-background"
                      >
                        <Paperclip class="w-3 h-3" />
                        {{ att.name }}
                      </div>
                    </div>
                  </div>
                  <p class="text-[10px] text-muted text-right pr-1">
                    Anda • {{ formatTime(msg.created_at) }}
                  </p>
                </div>
              </div>

              <!-- Admin Message (Left) -->
              <div v-else class="flex items-end justify-start gap-2.5 lg:gap-3">
                <div
                  class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-success-soft flex items-center justify-center text-[9px] lg:text-[10px] font-bold text-success shrink-0 mb-4 lg:mb-5"
                >
                  {{ getInitials("Appfoundry Support") }}
                </div>
                <div
                  class="max-w-[85%] sm:max-w-[75%] lg:max-w-[80%] space-y-1"
                >
                  <div
                    class="bg-surface-soft border border-border px-4 lg:px-5 py-2.5 lg:py-3 rounded-2xl rounded-bl-sm shadow-sm"
                  >
                    <p class="text-xs font-semibold text-success mb-1">
                      Tim Support
                    </p>
                    <p class="text-sm text-foreground leading-relaxed">
                      {{ msg.message }}
                    </p>
                  </div>
                  <p class="text-[10px] text-muted pl-1">
                    {{ formatTime(msg.created_at) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isAdminTyping" class="flex items-end gap-2.5 lg:gap-3">
              <div
                class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-success-soft flex items-center justify-center text-[9px] lg:text-[10px] font-bold text-success shrink-0"
              >
                AF
              </div>
              <div
                class="bg-surface-soft border border-border px-4 py-3 rounded-2xl rounded-bl-sm"
              >
                <div class="flex gap-1">
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                    style="animation-delay: 0ms"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                    style="animation-delay: 150ms"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                    style="animation-delay: 300ms"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reply Form -->
          <div
            v-if="ticket.status !== 'closed'"
            class="sticky bottom-0 shrink-0 p-3 lg:p-4 border-t border-border bg-background"
          >
            <div
              class="reply-box group relative rounded-2xl border border-border bg-surface transition-all duration-200"
            >
              <textarea
                ref="replyTextarea"
                v-model="replyMessage"
                placeholder="Tulis balasan Anda..."
                rows="1"
                class="reply-input w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed outline-none placeholder:text-muted/70 transition-[height] duration-100 ease-out"
                style="overflow-y: hidden"
                @input="autoGrow"
                @keydown.enter.exact.prevent="sendMessage"
              />

              <div class="flex items-center justify-between px-2.5 pb-2.5 pt-1">
                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    class="flex items-center justify-center h-8 w-8 rounded-lg text-muted hover:text-primary hover:bg-primary-soft/60 transition-colors"
                    @click="$refs.replyFile.click()"
                  >
                    <Paperclip class="w-4 h-4" />
                  </button>
                  <input
                    ref="replyFile"
                    type="file"
                    multiple
                    class="hidden"
                    @change="handleReplyAttachment"
                  />
                  <span
                    class="text-[11px] text-muted/70 tabular-nums pl-1 transition-opacity"
                    :class="
                      replyMessage.length > 0 ? 'opacity-100' : 'opacity-0'
                    "
                  >
                    {{ replyMessage.length }} karakter
                  </span>
                </div>

                <Button
                  variant="solid"
                  size="sm"
                  class="h-10 w-10 p-0 flex items-center justify-center rounded-xl shrink-0"
                  :disabled="!replyMessage.trim()"
                  @click="sendMessage"
                >
                  <Send class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <!-- <div class="flex items-end gap-2.5 lg:gap-3">
              <div class="flex-1 min-w-0">
                <input
                  v-model="replyMessage"
                  type="textarea"
                  placeholder="Tulis balasan Anda..."
                  rows="3"
                  max-width="100%"
                  marginB="none"
                  class="reply-input bg-transparent outline-none w-full"
                />
                <div class="flex items-center justify-between mt-2 px-1">
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary-soft/50 transition-colors"
                    @click="$refs.replyFile.click()"
                  >
                    <Paperclip class="w-4 h-4" />
                  </button>
                  <span class="text-[10px] text-muted"
                    >{{ replyMessage.length }} karakter</span
                  >
                </div>
                <input
                  ref="replyFile"
                  type="file"
                  multiple
                  class="hidden"
                  @change="handleReplyAttachment"
                />
              </div>
              
            </div> -->
          </div>
          <div
            v-else
            class="shrink-0 p-3 lg:p-4 border-t border-border bg-danger-soft/30 text-center"
          >
            <p class="text-xs text-danger font-medium">
              Ticket ini telah ditutup. Buat permohonan baru untuk bantuan lebih
              lanjut.
            </p>
          </div>
        </div>
      </div>

      <!-- Desktop Sidebar -->
      <div class="hidden lg:block lg:col-span-4 space-y-6">
        <!-- Status Tracker -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4"
        >
          <h3 class="text-base font-bold text-foreground">Status Ticket</h3>
          <Stepper
            :steps="statusSteps"
            direction="vertical"
            size="sm"
            :current-step="currentStep"
          />
        </div>

        <!-- Ticket Details -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4"
        >
          <h3 class="text-base font-bold text-foreground">Detail Ticket</h3>
          <div class="space-y-3 text-xs">
            <div
              class="flex justify-between items-center py-2 border-b border-border"
            >
              <span class="text-secondary">ID Ticket</span>
              <span class="font-mono font-semibold text-foreground">{{
                ticket.id
              }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-border"
            >
              <span class="text-secondary">Kategori</span>
              <span class="font-medium text-foreground capitalize">{{
                ticket.category
              }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-border"
            >
              <span class="text-secondary">Prioritas</span>
              <Badge :variant="priorityBadge.variant" size="sm">{{
                priorityBadge.label
              }}</Badge>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-border"
            >
              <span class="text-secondary">Project</span>
              <span class="font-medium text-foreground">kedaisenja.com</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-secondary">Dibuat Oleh</span>
              <div class="flex items-center gap-2">
                <div
                  class="w-5 h-5 rounded-full bg-primary-soft flex items-center justify-center text-[8px] font-bold text-primary"
                >
                  KK
                </div>
                <span class="font-medium text-foreground"
                  >Kedai Kopi Senja</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-3"
        >
          <h3 class="text-base font-bold text-foreground">Tindakan Cepat</h3>
          <Button variant="soft-primary" class="w-full justify-center">
            <div class="flex items-center gap-2">
              <FileText class="w-4 h-4" />
              Unduh Riwayat (PDF)
            </div>
          </Button>
          <Button
            variant="soft-warning"
            class="w-full justify-center"
            @click="navigateTo('/client/bantuan')"
          >
            <div class="flex items-center gap-2">
              <ArrowLeft class="w-4 h-4" />
              Kembali ke Daftar
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-card text-foreground w-full block lg:hidden">
    <div class="bg-card flex flex-col relative">
      <!-- Chat Header -->
      <div
        class="sticky top-[64px] z-10 -mx-4 md:-mx-6 shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-background"
      >
        <div class="flex items-center gap-2">
          <MessageCircle class="w-4 h-4 text-primary" />
          <h3 class="text-sm font-bold text-foreground">Percakapan</h3>
          <span class="text-xs text-muted">({{ messages.length }} pesan)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-success"
              ></span>
            </span>
          </div>
          <!-- Mobile Info Toggle -->
          <button
            class="lg:hidden ml-1 p-2 rounded-xl cursor-pointer bg-surface-soft text-muted hover:text-foreground transition-colors"
            @click="showMobileInfo = true"
          >
            <Info class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 min-h-0 mt-8 mb-8" ref="messageContainer">
        <div v-for="msg in messages" :key="msg.id" class="relative">
          <!-- System Message -->
          <div
            v-if="msg.type === 'system'"
            class="flex justify-center my-3 lg:my-4"
          >
            <span
              class="px-3 py-1 rounded-full bg-surface-soft border border-border text-[11px] text-muted"
            >
              {{ msg.message }}
            </span>
          </div>

          <!-- User Message (Right) -->
          <div
            v-else-if="msg.user_id === currentUserId"
            class="flex items-end justify-end gap-2.5 lg:gap-3"
          >
            <div class="max-w-[80%] space-y-1">
              <div
                class="bg-primary text-background px-4 lg:px-5 py-2.5 lg:py-3 rounded-2xl rounded-br-none shadow-sm after:content-[''] after:absolute after:right-0 after:bottom-0 after:translate-x-[8px] after:translate-y-[-19px] after:border-b-[15px] after:border-b-[var(--primary)] after:border-r-[15px] after:border-r-transparent"
              >
                <p class="text-sm leading-relaxed">{{ msg.message }}</p>
                <div
                  v-if="msg.attachments?.length"
                  class="flex flex-wrap gap-2 mt-2.5 pt-2.5 border-t border-white/20"
                >
                  <div
                    v-for="(att, aidx) in msg.attachments"
                    :key="aidx"
                    class="flex items-center gap-1.5 text-[11px] text-background"
                  >
                    <Paperclip class="w-3 h-3" />
                    {{ att.name }}
                  </div>
                </div>
              </div>
              <p class="text-[10px] text-muted text-right pr-1">
                Anda • {{ formatTime(msg.created_at) }}
              </p>
            </div>
          </div>

          <!-- Admin Message (Left) -->
          <div v-else class="flex items-end justify-start gap-2.5 lg:gap-3">
            <div
              class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-success-soft flex items-center justify-center text-[9px] font-bold text-success shrink-0 mb-4 lg:mb-5"
            >
              {{ getInitials("Appfoundry Support") }}
            </div>
            <div class="max-w-[80%] space-y-1">
              <div
                class="bg-surface-soft px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm after:content-[''] after:absolute after:left-0 after:bottom-0 after:translate-x-[28px] after:translate-y-[-19px] after:border-b-[15px] after:border-b-[var(--surface-soft)] after:border-l-[15px] after:border-l-transparent"
              >
                <p class="text-xs font-semibold text-success mb-1">
                  Tim Support
                </p>
                <p class="text-sm text-foreground leading-relaxed">
                  {{ msg.message }}
                </p>
              </div>
              <p class="text-[10px] text-muted pl-1">
                {{ formatTime(msg.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isAdminTyping" class="flex items-end gap-2.5 lg:gap-3">
          <div
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-success-soft flex items-center justify-center text-[9px] lg:text-[10px] font-bold text-success shrink-0"
          >
            AF
          </div>
          <div
            class="bg-surface-soft border border-border px-4 py-3 rounded-2xl rounded-bl-sm"
          >
            <div class="flex gap-1">
              <div
                class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                style="animation-delay: 0ms"
              ></div>
              <div
                class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                style="animation-delay: 150ms"
              ></div>
              <div
                class="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                style="animation-delay: 300ms"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reply Form -->
      <div
        class="sticky bottom-0 z-10 -mx-4 -mb-4 md:-mb-6 md:-mx-6 shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-background"
      >
        <div
          class="w-full reply-box group relative border border-border bg-surface transition-all duration-200"
        >
          <textarea
            ref="replyTextarea"
            v-model="replyMessage"
            placeholder="Tulis balasan Anda..."
            rows="1"
            class="reply-input w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed outline-none placeholder:text-muted/70 transition-[height] duration-100 ease-out"
            style="overflow-y: hidden"
            @input="autoGrow"
            @keydown.enter.exact.prevent="sendMessage"
          />

          <div class="flex items-center justify-between px-2 pb-2 pt-1">
            <div class="flex items-center gap-1">
              <button
                type="button"
                class="flex items-center justify-center h-8 w-8 rounded-lg text-muted hover:text-primary hover:bg-primary-soft/60 transition-colors cursor-pointer"
                @click="$refs.replyFile.click()"
              >
                <Paperclip class="w-4 h-4" />
              </button>
              <input
                ref="replyFile"
                type="file"
                multiple
                class="hidden"
                @change="handleReplyAttachment"
              />
              <span
                class="text-[11px] text-muted/70 tabular-nums pl-1 transition-opacity"
                :class="replyMessage.length > 0 ? 'opacity-100' : 'opacity-0'"
              >
                {{ replyMessage.length }} karakter
              </span>
            </div>

            <Button
              variant="solid"
              size="sm"
              class="h-10 w-10 p-0 flex items-center justify-center rounded-xl shrink-0"
              :disabled="!replyMessage.trim()"
              @click="sendMessage"
            >
              <Send class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "client",
  activeTab: "bantuan",
  title: "Detail Ticket Bantuan",
});

import { ref, computed, nextTick } from "vue";
import {
  Globe,
  MessageCircle,
  Paperclip,
  Send,
  Check,
  ArrowLeft,
  FileText,
  Info,
  X,
} from "~/utils/icons";

const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "Bantuan", to: "/client/bantuan" },
  { label: "#TICK-001" },
];

const currentUserId = "user-001";
const replyMessage = ref("");
const isAdminTyping = ref(false);
const showMobileInfo = ref(false);
const messageContainer = ref(null);

const ticket = ref({
  id: "#TICK-001",
  project_id: "proj-001",
  user_id: "user-001",
  subject: "Website tidak bisa diakses setelah update kontak",
  category: "technical",
  priority: "high",
  status: "in_progress",
  created_at: "2026-09-05T08:30:00Z",
  updated_at: "2026-09-06T07:15:00Z",
});
const MAX_HEIGHT = 200; // px, sesuaikan sama desainmu

function autoGrow(e) {
  const el = e.target;
  el.style.height = "auto"; // reset dulu biar scrollHeight kebaca ulang dari nol
  const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
  el.style.height = newHeight + "px";
  el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
}

watch(replyMessage, () => {
  nextTick(() => {
    if (replyTextarea.value) autoGrow({ target: replyTextarea.value });
  });
});
const messages = ref([
  {
    id: 1,
    ticket_id: "#TICK-001",
    user_id: "user-001",
    message:
      "Halo tim, website saya tidak bisa diakses sejak pagi ini. Saya sudah coba clear cache browser tapi masih blank page putih. Mohon bantuannya.",
    created_at: "2026-09-05T08:30:00Z",
    attachments: [{ name: "screenshot-error.png" }],
  },
  {
    id: 2,
    ticket_id: "#TICK-001",
    user_id: "system",
    message: "Ticket diteruskan ke tim teknis",
    created_at: "2026-09-05T08:31:00Z",
    type: "system",
  },
  {
    id: 3,
    ticket_id: "#TICK-001",
    user_id: "admin-001",
    message:
      "Terima kasih telah menghubungi kami. Kami sedang melakukan pengecekan pada server website Anda. Mohon ditunggu ya.",
    created_at: "2026-09-05T09:00:00Z",
  },
  {
    id: 4,
    ticket_id: "#TICK-001",
    user_id: "admin-001",
    message:
      "Kami menemukan bahwa ada konflik plugin pada CMS yang menyebabkan halaman blank. Tim kami sudah melakukan perbaikan dan website Anda sudah dapat diakses kembali. Silakan cek dan konfirmasi.",
    created_at: "2026-09-05T14:20:00Z",
  },
  {
    id: 5,
    ticket_id: "#TICK-001",
    user_id: "user-001",
    message:
      "Terima kasih banyak, website sudah bisa diakses kembali. Apakah ada yang perlu saya lakukan agar ini tidak terulang?",
    created_at: "2026-09-06T07:15:00Z",
  },
]);

const statusBadge = computed(() => {
  const map = {
    open: { variant: "info", label: "Terbuka" },
    in_progress: { variant: "warning", label: "Diproses" },
    resolved: { variant: "success", label: "Terselesaikan" },
    closed: { variant: "neutral", label: "Ditutup" },
  };
  return map[ticket.value.status] || map.open;
});

const priorityBadge = computed(() => {
  const map = {
    low: { variant: "neutral", label: "Rendah" },
    medium: { variant: "warning", label: "Sedang" },
    high: { variant: "danger", label: "Tinggi" },
    urgent: { variant: "danger", label: "Darurat" },
  };
  return map[ticket.value.priority] || map.medium;
});

const statusSteps = computed(() => [
  {
    title: "Ticket Dibuat",
    meta: formatDate(ticket.value.created_at),
  },
  {
    title: "Sedang Diproses",
    meta:
      ticket.value.status !== "open"
        ? formatDate(ticket.value.created_at)
        : null,
  },
  {
    title: "Masalah Terselesaikan",
    meta: ["resolved", "closed"].includes(ticket.value.status)
      ? formatDate(ticket.value.created_at)
      : null,
  },
  {
    title: "Ticket Ditutup",
    meta:
      ticket.value.status === "closed"
        ? formatDate(ticket.value.created_at)
        : null,
  },
]);
const currentStep = computed(() => {
  const statusMap = {
    open: 0,
    in_progress: 1,
    resolved: 2,
    closed: 3,
  };

  return statusMap[ticket.value.status] ?? 0;
});
const formatDate = (str) => {
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTime = (str) => {
  const d = new Date(str);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
};

const timeAgo = (str) => {
  const diff = Math.floor((new Date() - new Date(str)) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!replyMessage.value.trim()) return;

  messages.value.push({
    id: Date.now(),
    ticket_id: ticket.value.id,
    user_id: currentUserId,
    message: replyMessage.value,
    created_at: new Date().toISOString(),
  });

  replyMessage.value = "";
  scrollToBottom();

  setTimeout(() => {
    isAdminTyping.value = true;
    scrollToBottom();
    setTimeout(() => {
      isAdminTyping.value = false;
      messages.value.push({
        id: Date.now() + 1,
        ticket_id: ticket.value.id,
        user_id: "admin-001",
        message:
          "Baik, terima kasih konfirmasinya. Kami akan memantau secara berkala. Jika ada kendala lain silakan hubungi kami kembali.",
        created_at: new Date().toISOString(),
      });
      ticket.value.updated_at = new Date().toISOString();
      scrollToBottom();
    }, 3000);
  }, 1000);
};

const handleReplyAttachment = (e) => {
  // Handle file attachment logic
};
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
.reply-input {
  min-height: 44px;
  line-height: 1.5;
}

.reply-input::-webkit-scrollbar {
  width: 6px;
}
.reply-input::-webkit-scrollbar-thumb {
  border-radius: 999px;
}
:deep(.reply-input textarea) {
  min-height: 44px !important;
  max-height: 120px !important;
}
</style>
