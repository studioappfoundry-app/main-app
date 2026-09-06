<template>
  <div class="bg-card min-h-screen text-foreground p-2 pt-6 lg:p-6 space-y-6">
    <!-- Header Section -->
    <div>
      <h1 class="text-2xl font-bold text-foreground tracking-tight">Profil</h1>

      <p class="text-secondary text-sm mt-1">Kelola informasi akun Anda.</p>
    </div>

    <!-- Main Grid Content -->
    <div class="flex gap-6 flex-col md:flex-row items-stretch">
      <!-- LEFT COLUMN: Profile Summary Card -->
      <div class="md:w-1/2 w-full">
        <div
          class="bg-background border border-border rounded-xl p-6 shadow-app space-y-6 flex flex-col items-center text-center"
        >
          <!-- Avatar with Camera Badge -->
          <div class="relative">
            <div
              class="w-28 h-28 rounded-full overflow-hidden bg-surface border-2 border-border flex items-center justify-center"
            >
              <img
                v-if="profile.avatar_url"
                :src="profile.avatar_url"
                :alt="profile.name"
                class="w-full h-full object-cover"
              />

              <span v-else class="text-2xl font-bold text-muted">
                {{ initials }}
              </span>
            </div>

            <button
              class="absolute bottom-0 right-0 p-2 bg-background border border-border rounded-full text-foreground hover:bg-surface shadow-app transition-colors"
            >
              <Camera class="w-4 h-4 text-secondary" />
            </button>
          </div>

          <!-- Name & Role -->
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-foreground">
              {{ profile.name }}
            </h2>

            <div class="flex items-center justify-center gap-1.5">
              <Badge :variant="roleBadge.variant" size="sm">
                {{ roleBadge.label }}
              </Badge>

              <Badge :variant="statusBadge.variant" size="sm">
                {{ statusBadge.label }}
              </Badge>
            </div>
          </div>

          <!-- Meta Details -->
          <div
            class="w-full border-t border-border pt-6 space-y-3.5 text-xs text-left"
          >
            <div class="flex items-center gap-5 text-secondary">
              <Mail class="w-4 h-4 text-muted shrink-0" />

              <span class="truncate text-foreground">
                {{ user.email }}
              </span>
            </div>

            <div class="flex items-center gap-5 text-secondary">
              <Phone class="w-4 h-4 text-muted shrink-0" />

              <span class="text-foreground">
                {{ profile.phone || "Belum ditambahkan" }}
              </span>
            </div>

            <div class="flex items-center gap-5 text-secondary">
              <Calendar class="w-4 h-4 text-muted shrink-0" />

              <span> Bergabung sejak {{ formatDate(user.created_at) }} </span>
            </div>

            <div class="flex items-center gap-5 text-secondary">
              <Clock class="w-4 h-4 text-muted shrink-0" />

              <span>
                Terakhir login:
                {{ formatDateTime(user.last_login_at) }}
              </span>
            </div>

            <div class="flex items-center gap-5 text-secondary">
              <Chrome class="w-4 h-4 text-muted shrink-0" />

              <span>Masuk dengan Google</span>
            </div>
          </div>
        </div>
      </div>
      <!-- RIGHT COLUMN: Informasi Pribadi -->
      <div class="md:w-1/2 w-full">
        <div
          class="h-full bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
        >
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-foreground">
              Informasi Pribadi
            </h2>

            <Button
              size="sm"
              variant="outline"
              @click="isEditing ? cancelEdit() : startEdit()"
            >
              <div class="flex gap-2 items-center">
                <component :is="isEditing ? X : Edit3" class="w-3.5 h-3.5" />

                <span>
                  {{ isEditing ? "Batal" : "Edit" }}
                </span>
              </div>
            </Button>
          </div>

          <!-- Read Mode -->
          <div v-if="!isEditing" class="divide-y divide-border text-xs">
            <div class="grid grid-cols-3 gap-2 py-3 first:pt-0">
              <span class="text-secondary"> Nama Lengkap </span>

              <span class="col-span-2 font-medium text-foreground">
                {{ profile.name }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 py-3">
              <span class="text-secondary"> Email </span>

              <span
                class="col-span-2 flex items-center gap-1.5 font-medium text-foreground"
              >
                {{ user.email }}

                <span
                  class="text-[10px] text-muted font-normal flex items-center gap-1"
                >
                  <Lock class="w-3 h-3" />
                  Dikelola oleh Google
                </span>
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 py-3">
              <span class="text-secondary"> Nomor Telepon </span>

              <span class="col-span-2 font-medium text-foreground">
                {{ profile.phone || "Belum ditambahkan" }}
              </span>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-else class="space-y-4">
            <div>
              <label class="text-xs text-secondary font-medium block mb-1.5">
                Nama Lengkap
              </label>

              <Input v-model="form.name" placeholder="Nama lengkap" />
            </div>

            <div>
              <label class="text-xs text-secondary font-medium block mb-1.5">
                Nomor Telepon
              </label>

              <Input v-model="form.phone" placeholder="+62 812-3456-7890" />
            </div>

            <div>
              <label class="text-xs text-secondary font-medium block mb-1.5">
                Email
              </label>

              <div
                class="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface border border-border text-xs text-muted"
              >
                <Lock class="w-3.5 h-3.5 shrink-0" />

                <span>
                  {{ user.email }} — terhubung melalui Google, tidak dapat
                  diubah
                </span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
              <Button size="sm" variant="outline" @click="cancelEdit">
                Batal
              </Button>

              <Button
                size="sm"
                variant="primary"
                :disabled="saving"
                @click="saveProfile"
              >
                {{ saving ? "Menyimpan..." : "Simpan Perubahan" }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  Camera,
  Mail,
  Phone,
  Calendar,
  Clock,
  Chrome,
  Lock,
  Edit3,
  X,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "profil",
  title: "Profil",
});

/*
|--------------------------------------------------------------------------
| Dummy Data
|--------------------------------------------------------------------------
*/

const user = ref({
  id: 1,
  email: "admin@appfoundry.id",
  role: "admin",
  status: "active",
  created_at: "2026-01-15T08:30:00.000Z",
  last_login_at: "2026-08-21T07:45:00.000Z",
});

const profile = ref({
  id: 1,
  name: "Maeskey Developer",
  phone: "+62 812-3456-7890",
  avatar_url: null,
  updated_at: "2026-08-20T10:30:00.000Z",
});

const saving = ref(false);
const isEditing = ref(false);

const form = reactive({
  name: "",
  phone: "",
});

const initials = computed(() => {
  return profile.value.name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

const roleBadge = computed(() => {
  return user.value.role === "admin"
    ? {
        label: "Admin",
        variant: "warning",
      }
    : {
        label: "Client",
        variant: "neutral",
      };
});

const statusBadge = computed(() => {
  return user.value.status === "active"
    ? {
        label: "Aktif",
        variant: "success",
      }
    : {
        label: "Nonaktif",
        variant: "danger",
      };
});

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const startEdit = () => {
  form.name = profile.value.name || "";
  form.phone = profile.value.phone || "";

  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveProfile = async () => {
  saving.value = true;

  try {
    // Simulasi request API
    await new Promise((resolve) => setTimeout(resolve, 500));

    profile.value.name = form.name;
    profile.value.phone = form.phone;
    profile.value.updated_at = new Date().toISOString();

    isEditing.value = false;
  } finally {
    saving.value = false;
  }
};
</script>
