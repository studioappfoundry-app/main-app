<template>
  <div class="bg-card p-2 pt-6 lg:p-6 text-foreground">
    <Breadcumb :items="breadcrumbItems" />

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        Permohonan Bantuan Baru
      </h1>
      <p class="text-sm text-secondary mt-1">
        Jelaskan kendala Anda dengan detail agar tim kami dapat membantu lebih
        cepat.
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Form Section -->
      <div class="lg:col-span-8 space-y-6">
        <div
          class="bg-background border border-border rounded-2xl p-6 md:p-8 shadow-app space-y-6"
        >
          <!-- Subject -->
          <Input
            v-model="form.subject"
            type="text"
            label="Judul Permohonan"
            placeholder="Contoh: Website tidak bisa diakses setelah update"
            max-width="100vw"
            marginB="none"
          >
            <template #icon-left>
              <HelpCircle class="w-4 h-4 text-muted" />
            </template>
          </Input>

          <!-- Category & Priority Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category -->
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-secondary"
                >Kategori</label
              >
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat.value"
                  @click="form.category = cat.value"
                  :class="[
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all',
                    form.category === cat.value
                      ? 'bg-primary-soft text-primary border-primary/20'
                      : 'bg-surface text-secondary border-border hover:bg-background',
                  ]"
                >
                  <component :is="cat.icon" class="w-3.5 h-3.5" />
                  {{ cat.label }}
                </button>
              </div>
            </div>

            <!-- Priority -->
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-secondary"
                >Prioritas</label
              >
              <div class="flex gap-2">
                <button
                  v-for="pri in priorities"
                  :key="pri.value"
                  @click="form.priority = pri.value"
                  :class="[
                    'flex-1 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1',
                    form.priority === pri.value
                      ? pri.activeClass
                      : 'bg-surface text-secondary border-border hover:bg-background',
                  ]"
                >
                  <component :is="pri.icon" class="w-3.5 h-3.5" />
                  {{ pri.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-1.5">
            <Input
              v-model="form.message"
              type="textarea"
              label="Detail Masalah"
              placeholder="Ceritakan langkah-langkah yang Anda lakukan sebelum masalah terjadi, error message yang muncul, dan halaman mana yang terdampak..."
              rows="6"
              max-width="100vw"
              marginB="none"
            />
            <div class="flex items-center justify-between px-1">
              <span class="text-[11px] text-muted"
                >{{ form.message.length }} karakter</span
              >
              <span class="text-[11px] text-muted">Min. 20 karakter</span>
            </div>
          </div>

          <!-- File Upload -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-secondary"
              >Lampiran (Opsional)</label
            >
            <div
              class="relative group cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <div
                class="border-2 border-dashed border-border rounded-2xl p-8 text-center transition-all group-hover:border-primary/40 group-hover:bg-primary-soft/30"
                :class="{ 'border-primary bg-primary-soft/20': isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-surface-soft flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                >
                  <UploadCloud
                    class="w-6 h-6 text-muted group-hover:text-primary transition-colors"
                  />
                </div>
                <p class="text-sm font-medium text-foreground">
                  <span class="text-primary">Klik untuk upload</span> atau drag
                  & drop
                </p>
                <p class="text-[11px] text-muted mt-1">
                  PNG, JPG, PDF, ZIP maks. 2MB
                </p>
              </div>
              <input
                ref="fileInput"
                type="file"
                multiple
                class="hidden"
                @change="handleFileSelect"
              />
            </div>

            <!-- File List -->
            <div
              v-if="attachments.length > 0"
              class="flex flex-wrap gap-2 mt-3"
            >
              <div
                v-for="(file, idx) in attachments"
                :key="idx"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-soft border border-border text-xs"
              >
                <FileText class="w-3.5 h-3.5 text-primary" />
                <span
                  class="text-foreground font-medium max-w-[120px] truncate"
                  >{{ file.name }}</span
                >
                <button
                  @click="removeAttachment(idx)"
                  class="text-muted hover:text-danger ml-1"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4">
            <Button
              variant="solid"
              :disabled="!isFormValid"
              @click="submitTicket"
            >
              <div class="flex items-center gap-2">
                <Send class="w-4 h-4" />
                Kirim Permohonan
              </div>
            </Button>
          </div>
        </div>
      </div>

      <!-- Sidebar Info -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Panduan -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-base font-bold text-foreground">
              Tips Mengajukan Bantuan
            </h3>
          </div>
          <ul class="space-y-3">
            <li
              v-for="(tip, i) in tips"
              :key="i"
              class="flex items-start gap-3 text-xs text-secondary"
            >
              <span
                class="flex-shrink-0 w-5 h-5 rounded-full bg-surface-soft flex items-center justify-center text-[10px] font-bold text-muted mt-0.5"
              >
                {{ i + 1 }}
              </span>
              <span class="leading-relaxed">{{ tip }}</span>
            </li>
          </ul>
        </div>

        <!-- Info Kontak -->
        <div
          class="bg-background border border-border rounded-2xl p-6 shadow-app space-y-4"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-base font-bold text-foreground">
              Butuh Respon Cepat?
            </h3>
          </div>
          <div class="space-y-3">
            <div
              class="flex items-center gap-3 p-3 rounded-xl bg-surface-soft border border-border"
            >
              <MessageSquare class="w-4 h-4 text-success" />
              <a href="https://wa.me/6282353731276" target="_blank">
                <p class="text-xs font-medium text-foreground">WhatsApp</p>
                <p class="text-[11px] text-secondary">082353731276</p>
              </a>
            </div>
            <div
              class="flex items-center gap-3 p-3 rounded-xl bg-surface-soft border border-border"
            >
              <Mail class="w-4 h-4 text-info" />
              <a target="_blank" href="mailto:support@appfoundry.com">
                <p class="text-xs font-medium text-foreground">Email</p>
                <p class="text-[11px] text-secondary">support@appfoundry.com</p>
              </a>
            </div>
          </div>
        </div>

        <!-- SLA Info -->
        <div
          class="bg-warning-soft border border-warning/20 rounded-2xl p-6 space-y-2"
        >
          <div class="flex items-center gap-2 text-warning mb-5">
            <h3 class="text-base font-bold">Waktu Respon</h3>
          </div>
          <div class="space-y-1 text-xs text-secondary">
            <div class="flex justify-between">
              <span>Prioritas Tinggi</span>
              <span class="font-semibold text-foreground">&lt; 2 jam</span>
            </div>
            <div class="flex justify-between">
              <span>Prioritas Sedang</span>
              <span class="font-semibold text-foreground">&lt; 8 jam</span>
            </div>
            <div class="flex justify-between">
              <span>Prioritas Rendah</span>
              <span class="font-semibold text-foreground">&lt; 24 jam</span>
            </div>
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
  title: "Permohonan Bantuan",
});

import { ref, computed } from "vue";
import {
  HelpCircle,
  UploadCloud,
  FileText,
  X,
  ArrowLeft,
  Send,
  Lightbulb,
  Headset,
  MessageSquare,
  Mail,
  Clock,
  Globe,
  CreditCard,
  Wrench,
  Sparkles,
  AlertTriangle,
  Zap,
  AlertCircle,
} from "~/utils/icons";

const breadcrumbItems = [
  { label: "Dashboard", to: "/client/" },
  { label: "Bantuan", to: "/client/bantuan/" },
  { label: "Permohonan Baru" },
];

const form = ref({
  subject: "",
  category: "general",
  priority: "medium",
  message: "",
});

const attachments = ref([]);
const isDragging = ref(false);
const fileInput = ref(null);

const categories = [
  { value: "general", label: "Umum", icon: HelpCircle },
  { value: "technical", label: "Teknis", icon: Wrench },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "feature", label: "Fitur", icon: Sparkles },
];

const priorities = [
  {
    value: "low",
    label: "Rendah",
    icon: Clock,
    activeClass: "bg-success-soft text-success border-success/20",
  },
  {
    value: "medium",
    label: "Sedang",
    icon: AlertTriangle,
    activeClass: "bg-warning-soft text-warning border-warning/20",
  },
  {
    value: "high",
    label: "Tinggi",
    icon: Zap,
    activeClass: "bg-danger-soft text-danger border-danger/20",
  },
  {
    value: "urgent",
    label: "Darurat",
    icon: AlertCircle,
    activeClass: "bg-danger-soft text-danger border-danger/20 animate-pulse",
  },
];

const tips = [
  "Gunakan judul yang spesifik dan menggambarkan masalah utama.",
  "Sertakan URL halaman yang bermasalah jika ada.",
  "Jelaskan langkah-langkah yang Anda lakukan sebelum error terjadi.",
  "Lampirkan screenshot jika ada pesan error atau tampilan aneh.",
];

const isFormValid = computed(() => {
  return form.value.subject.length >= 5 && form.value.message.length >= 20;
});

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  attachments.value.push(...files);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  attachments.value.push(...files);
};

const removeAttachment = (idx) => {
  attachments.value.splice(idx, 1);
};

const submitTicket = () => {
  console.log("Submitting:", form.value, attachments.value);
  navigateTo("/client/bantuan/");
};
</script>
