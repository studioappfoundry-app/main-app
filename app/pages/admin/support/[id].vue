<template>
  <div class="p-2 pt-6 lg:p-6 bg-card min-h-screen">
    <div class="space-y-6">
      <!-- Breadcrumb -->
      <Breadcumb
        :items="[
          {
            label: 'Dashboard',
            to: '/admin',
          },
          {
            label: 'Bantuan',
            to: '/admin/support',
          },
          {
            label: ticket.clientName,
          },
        ]"
      />

      <!-- Header -->
      <div class="flex items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-4">
            <h1 class="text-3xl font-semibold text-foreground">
              Ticket #{{ ticket.id }}
            </h1>

            <Badge :variant="statusClass">
              {{ ticket.status }}
            </Badge>
          </div>
        </div>

        <Button variant="primary">
          <div class="flex gap-2">
            <RotateCw class="size-5" />
            <span class="font-semibold">Update Progress</span>
          </div>
        </Button>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-12 gap-6 items-start">
        <!-- Column 1 -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div
            class="bg-background rounded-2xl border border-border p-6 space-y-5"
          >
            <h3 class="text-lg font-semibold text-foreground">
              Informasi Ticket
            </h3>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">Topik / Masalah</div>

              <div
                class="col-span-8 col-span-8 text-sm font-medium text-foreground"
              >
                {{ ticket.topic }}
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">Kategori</div>

              <div
                class="col-span-8 col-span-8 text-sm font-medium text-foreground"
              >
                {{ ticket.category }}
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">Dibuat Oleh</div>

              <div class="col-span-8 text-sm font-medium text-foreground">
                {{ ticket.createdBy }}

                <span class="text-secondary"> ({{ ticket.clientName }}) </span>
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">Email</div>

              <div class="col-span-8 text-sm font-medium text-foreground">
                {{ ticket.email }}
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">No. Telepon</div>

              <div class="col-span-8 text-sm font-medium text-foreground">
                {{ ticket.phone }}
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-4 text-secondary">Status</div>
              <div class="col-span-8">
                <Badge :variant="statusClass">
                  {{ ticket.status }}
                </Badge>
              </div>
            </div>

            <div class="flex flex-col gap-3 pt-1">
              <div class="text-sm font-medium text-foreground">Progress</div>

              <div class="flex items-center">
                <ProgressBar :value="60" />
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div
            class="bg-background rounded-2xl border border-border p-6 space-y-5"
          >
            <h3 class="text-lg font-semibold text-foreground">
              Timeline Progress
            </h3>

            <div
              class="space-y-6 relative pl-3 before:content-[''] before:absolute before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border"
            >
              <div
                v-for="(item, index) in ticket.timeline"
                :key="index"
                class="relative flex items-start gap-4"
              >
                <!-- Icon / Indicator -->
                <div
                  class="relative z-10 flex items-center justify-center w-4 h-4 rounded-full mt-0.5"
                >
                  <CheckCircle2
                    v-if="item.status === 'completed'"
                    class="w-4 h-4 text-success fill-success-soft"
                  />

                  <div
                    v-else-if="item.status === 'active'"
                    class="w-3 h-3 rounded-full bg-primary ring-3 ring-lime-400/20"
                  />

                  <Circle v-else class="w-4 h-4 text-muted fill-background" />
                </div>

                <!-- Content -->
                <div class="flex-1 -mt-0.5">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold text-foreground">
                      {{ item.title }}
                    </span>

                    <span
                      class="text-xs font-medium shrink-0"
                      :class="{
                        'text-success': item.status === 'completed',
                        'text-primary': item.status === 'active',
                        'text-muted': item.status === 'pending',
                      }"
                    >
                      {{
                        item.status === "completed"
                          ? "Selesai"
                          : item.status === "active"
                            ? "Sedang Berjalan"
                            : "Menunggu"
                      }}
                    </span>
                  </div>

                  <p class="text-xs text-secondary mt-0.5">
                    {{ item.description }}
                  </p>

                  <span class="text-[11px] text-muted block mt-1">
                    {{ item.date }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="ticket.attachment"
            class="bg-background rounded-2xl border border-border p-6 space-y-5"
          >
            <h3 class="text-lg font-semibold text-foreground">Lampiran</h3>

            <div
              class="flex items-center gap-3 bg-surface p-3.5 rounded-xl border border-border"
            >
              <FileText class="size-10 text-muted" />

              <div class="flex-grow">
                <div class="text-sm font-medium text-foreground">
                  {{ ticket.attachment.name }}
                </div>

                <div class="text-xs text-muted mt-0.5">
                  {{ ticket.attachment.date }}
                </div>
              </div>

              <button class="p-2 text-muted hover:text-foreground">
                <Download class="size-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div
            class="bg-background rounded-2xl border border-border p-6 space-y-5"
          >
            <h3 class="text-lg font-semibold text-foreground">
              Informasi Lain
            </h3>

            <div class="space-y-4 text-sm">
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">Website</div>
                <div class="col-span-8 font-medium">
                  <a
                    :href="`https://${ticket.website}`"
                    target="_blank"
                    class="flex items-center gap-1.5 text-primary hover:underline font-medium"
                  >
                    {{ ticket.website }}

                    <ExternalLink class="size-4" />
                  </a>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">Browser</div>

                <div class="col-span-8 font-medium text-foreground">
                  {{ ticket.browser }}
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">Device</div>

                <div class="col-span-8 font-medium text-foreground">
                  {{ ticket.device }}
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">Kategori</div>

                <div class="col-span-8 font-medium text-foreground">
                  {{ ticket.category }}
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">SLA Response</div>

                <div class="col-span-8 font-medium text-foreground">
                  {{ ticket.slaResponse }}
                </div>
              </div>
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-4 text-secondary">SLA Resolve</div>

                <div class="col-span-8 font-medium text-foreground">
                  {{ ticket.slaResolve }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-background rounded-2xl border border-border p-6 space-y-5"
          >
            <h3 class="text-lg font-semibold text-foreground">
              Catatan Internal
            </h3>

            <p class="text-sm text-secondary bg-surface rounded-xl p-4">
              {{ ticket.internalNote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ExternalLink,
  RotateCw,
  CircleDot,
  Check,
  FileText,
  Download,
  CheckCircle2,
  Circle,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "support",
  title: "Detail Support",
});

const route = useRoute();

const supportTickets = [
  {
    id: 1024,
    date: "12 Agu 2026, 10:23",
    clientShort: "KS",
    clientName: "Klinik Sehat",
    website: "kliniksehat.com",
    topic: "Contact form tidak mengirim email",
    priority: "Tinggi",
    status: "In Progress",
    progress: 60,
    lastUpdateDate: "12 Agu 2026, 10:23",
    lastUpdateBy: "Admin",

    category: "Bug",
    createdBy: "Ahmad Rasyid",
    email: "ahmad@kliniksehat.com",
    phone: "+62 812-3456-7890",

    browser: "Chrome 127.0.0.1",
    device: "Desktop (Windows)",

    slaResponse: "2 jam",
    slaResolve: "1 hari kerja",

    internalNote:
      "Kemungkinan masalah di konfigurasi SMTP atau plugin form handling.",

    timeline: [
      {
        title: "Ticket Dibuat",
        date: "12 Agu 2026, 10:23",
        description: "Ticket dibuat oleh client",
        status: "active",
      },
      {
        title: "Sedang Ditangani",
        date: "12 Agu 2026, 11:02",
        description: "Admin mulai mengecek masalah",
        status: "active",
      },
      {
        title: "Perbaikan",
        date: "12 Agu 2026, 14:20",
        description: "Masalah ditemukan, sedang diperbaiki",
        status: "completed",
      },
      {
        title: "Testing",
        date: "Menunggu",
        description: "Akan dilakukan testing setelah perbaikan",
        status: "pending",
      },
      {
        title: "Selesai",
        date: "Menunggu",
        description: "Ticket akan ditutup setelah konfirmasi client",
        status: "pending",
      },
    ],

    attachment: {
      name: "error-log-contact-form.txt",
      date: "12 Agu 2026, 10:24",
    },
  },

  {
    id: 1023,
    date: "11 Agu 2026, 14:50",
    clientShort: "CN",
    clientName: "Cafe Nusantara",
    website: "cafenusantara.com",
    topic: "Update banner di homepage",
    priority: "Sedang",
    status: "On Hold",
    progress: 40,

    category: "Permintaan Update",
    createdBy: "Budi Santoso",
    email: "budi@cafenusantara.com",
    phone: "+62 812-1111-2222",

    browser: "Chrome",
    device: "Desktop",

    slaResponse: "4 jam",
    slaResolve: "2 hari kerja",

    internalNote: "Menunggu materi banner terbaru dari client.",
  },
];

const ticket = computed(() => {
  return supportTickets.find((item) => item.id === Number(route.params.id));
});

if (!ticket.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Ticket tidak ditemukan",
  });
}

const goBack = () => {
  navigateTo("/admin/support");
};

const priorityClass = computed(() => {
  const classes = {
    Tinggi: "bg-danger-soft text-danger",
    Sedang: "bg-warning-soft text-warning",
    Rendah: "bg-success-soft text-success",
  };

  return classes[ticket.value.priority];
});

const statusClass = computed(() => {
  const classes = {
    "In Progress": "info",
    "On Hold": "neutral",
    Open: "warning",
    Resolved: "success",
  };

  return classes[ticket.value.status];
});

const progressClass = computed(() => {
  if (ticket.value.progress < 70) return "bg-info";
  if (ticket.value.progress < 90) return "bg-warning";

  return "bg-success";
});
</script>
