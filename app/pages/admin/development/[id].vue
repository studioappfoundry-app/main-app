<template>
  <div class="bg-card min-h-screen text-foreground p-2 pt-6 lg:p-6">
    <div v-if="selectedProject" class="space-y-6">
      <Breadcumb
        :items="[
          { label: 'Dashboard', to: '/admin' },
          { label: 'Development', to: '/admin/development' },
          { label: selectedProject.name },
        ]"
      />

      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-foreground tracking-tight">
              {{ selectedProject.name }}
            </h1>

            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-soft text-warning"
            >
              {{ selectedProject.stage }}
            </span>
          </div>

          <a
            href="#"
            class="flex items-center gap-1 text-xs text-secondary mt-1"
          >
            <span>{{ selectedProject.website }}</span>

            <ExternalLink
              class="w-3 h-3 text-muted cursor-pointer hover:text-foreground"
            />
          </a>
        </div>

        <div class="flex items-center gap-3">
          <Button variant="primary">
            <div class="flex gap-2">
              <Plus class="w-4 h-4" />
              <span>Update Progress</span>
            </div>
          </Button>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT -->
        <div class="space-y-6">
          <!-- Progress -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
          >
            <h2
              class="text-sm font-semibold text-secondary uppercase tracking-wider"
            >
              Progress Project
            </h2>

            <div>
              <div
                class="text-4xl font-extrabold text-foreground tracking-tight"
              >
                {{ selectedProject.progress }}%
              </div>

              <p class="text-xs text-secondary mt-0.5">Selesai</p>
            </div>

            <ProgressBar
              :show-value="false"
              :value="selectedProject.progress"
              size="lg"
            />

            <div
              class="grid grid-cols-2 pt-2 border-t border-border gap-4 text-xs"
            >
              <div>
                <span class="text-secondary block mb-1"> Target Selesai </span>

                <div
                  class="flex items-center gap-1 text-foreground font-medium"
                >
                  <Calendar class="w-3.5 h-3.5 text-secondary" />

                  <span>
                    {{ selectedProject.targetDate }}
                  </span>
                </div>
              </div>

              <div>
                <span class="text-secondary block mb-1"> Terakhir Update </span>

                <div
                  class="flex items-center gap-1 text-foreground font-medium"
                >
                  <Clock class="w-3.5 h-3.5 text-secondary" />

                  <span>
                    {{ selectedProject.lastUpdate }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Riwayat -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-sm font-semibold text-secondary uppercase tracking-wider"
              >
                Riwayat Update
              </h2>

              <span
                class="text-xs text-primary font-medium cursor-pointer hover:underline"
              >
                Lihat Semua
              </span>
            </div>

            <div
              class="space-y-4 relative pl-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border"
            >
              <div
                v-for="(update, index) in selectedProject.updatesHistory"
                :key="index"
                class="relative space-y-1"
              >
                <div
                  class="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"
                />

                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-foreground">
                    {{ update.progress }}% - Progress diupdate
                  </span>

                  <span class="text-muted text-[10px]">
                    {{ update.date }}
                  </span>
                </div>

                <p class="text-xs text-secondary">
                  {{ update.desc }} oleh {{ update.author }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CENTER -->
        <div class="space-y-6">
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app space-y-6"
          >
            <h2
              class="text-sm font-semibold text-secondary uppercase tracking-wider"
            >
              Tahapan Pengerjaan
            </h2>

            <div
              class="space-y-6 relative pl-3 before:content-[''] before:absolute before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border"
            >
              <div
                v-for="(stage, index) in selectedProject.stagesTimeline"
                :key="index"
                class="relative flex items-start gap-4"
              >
                <div
                  class="relative z-10 flex items-center justify-center w-4 h-4 rounded-full mt-0.5"
                >
                  <CheckCircle2
                    v-if="stage.status === 'completed'"
                    class="w-4 h-4 text-success fill-success-soft"
                  />

                  <div
                    v-else-if="stage.status === 'in-progress'"
                    class="w-3 h-3 rounded-full bg-primary ring-3 ring-lime-400/20"
                  />

                  <Circle v-else class="w-4 h-4 text-muted fill-background" />
                </div>

                <div class="flex-1 -mt-0.5">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-foreground">
                      {{ stage.name }}
                    </span>

                    <span
                      class="text-xs font-medium"
                      :class="{
                        'text-success': stage.status === 'completed',
                        'text-primary': stage.status === 'in-progress',
                        'text-muted': stage.status === 'pending',
                      }"
                    >
                      {{
                        stage.status === "completed"
                          ? "Selesai"
                          : stage.status === "in-progress"
                            ? "Sedang Berjalan"
                            : "Menunggu"
                      }}
                    </span>
                  </div>

                  <p class="text-xs text-secondary mt-0.5">
                    {{ stage.desc }}
                  </p>

                  <span class="text-[11px] text-muted block mt-1">
                    {{ stage.date }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="space-y-6">
          <!-- Informasi Project -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
          >
            <h2
              class="text-sm font-semibold text-secondary uppercase tracking-wider"
            >
              Informasi Project
            </h2>

            <div class="space-y-3 text-xs divide-y divide-border">
              <div class="flex items-center justify-between pt-2 first:pt-0">
                <span class="text-secondary"> Jenis Website </span>

                <span class="font-medium text-foreground">
                  {{ selectedProject.jenisWebsite }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-3">
                <span class="text-secondary"> Paket Hosting </span>

                <span class="font-medium text-foreground">
                  {{ selectedProject.paketHosting }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-3">
                <span class="text-secondary"> Domain </span>

                <span
                  class="font-medium text-primary flex items-center gap-1 cursor-pointer"
                >
                  {{ selectedProject.domain }}

                  <ExternalLink class="w-3 h-3" />
                </span>
              </div>

              <div class="flex items-center justify-between pt-3">
                <span class="text-secondary"> Server / Lokasi </span>

                <span class="font-medium text-foreground">
                  {{ selectedProject.serverLokasi }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-3">
                <span class="text-secondary"> SSL </span>

                <span
                  class="flex items-center gap-1.5 font-medium text-success"
                >
                  <ShieldCheck class="w-3.5 h-3.5" />

                  Aktif

                  <span class="text-muted text-[10px] font-normal">
                    ({{ selectedProject.sslValid }})
                  </span>
                </span>
              </div>
            </div>
          </div>

          <!-- Catatan -->
          <div
            class="bg-background border border-border rounded-xl p-6 shadow-app space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-sm font-semibold text-secondary uppercase tracking-wider"
              >
                Catatan Terakhir
              </h2>
            </div>

            <div class="space-y-3">
              <span class="text-[11px] text-muted block">
                {{ selectedProject.latestNote.date }}
              </span>

              <p class="text-xs text-foreground leading-relaxed">
                {{ selectedProject.latestNote.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 class="text-xl font-bold text-foreground">Project tidak ditemukan</h1>

      <button
        @click="goBack"
        class="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm"
      >
        Kembali ke Development
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import {
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Plus,
} from "~/utils/icons";

definePageMeta({
  layout: "admin",
  activeTab: "development",
  title: "Detail Development",
});

const route = useRoute();
const router = useRouter();

const projects = [
  {
    id: 1,
    name: "Klinik Sehat",
    website: "kliniksehat.com",
    progress: 75,
    stage: "Development",
    targetDate: "20 Agu 2026",
    lastUpdate: "12 Agu 2026",

    domain: "kliniksehat.com",
    jenisWebsite: "Company Profile",
    paketHosting: "VPS Pro",
    serverLokasi: "Singapore",
    sslValid: "Valid s.d 12 Agu 2027",
    projectManager: "Admin Appfoundry",

    latestNote: {
      date: "12 Agu 2026, 10:23",
      content:
        "Homepage dan halaman layanan sudah selesai. Sedang mengerjakan halaman tentang kami dan integrasi form kontak.",
      author: "Admin Appfoundry",
    },

    stagesTimeline: [
      {
        name: "Requirement & Briefing",
        desc: "Pengumpulan kebutuhan dan analisa awal project.",
        date: "01 Agu 2026",
        status: "completed",
      },
      {
        name: "Design",
        desc: "Pembuatan wireframe dan desain UI/UX.",
        date: "04 Agu 2026",
        status: "completed",
      },
      {
        name: "Development",
        desc: "Proses pengkodean dan implementasi fitur.",
        date: "12 Agu 2026",
        status: "in-progress",
      },
      {
        name: "Review & Testing",
        desc: "QA, revisi dan pengujian bersama client.",
        date: "Menunggu",
        status: "pending",
      },
      {
        name: "Deployment",
        desc: "Deploy ke server dan final checking.",
        date: "Menunggu",
        status: "pending",
      },
      {
        name: "Handover",
        desc: "Serah terima project ke client.",
        date: "Menunggu",
        status: "pending",
      },
    ],

    updatesHistory: [
      {
        progress: 75,
        date: "12 Agu 2026, 10:23",
        desc: "Progress diupdate menjadi 75%",
        author: "Admin Appfoundry",
      },
      {
        progress: 60,
        date: "08 Agu 2026, 14:10",
        desc: "Progress diupdate menjadi 60%",
        author: "Admin Appfoundry",
      },
      {
        progress: 40,
        date: "04 Agu 2026, 09:15",
        desc: "Progress diupdate menjadi 40%",
        author: "Admin Appfoundry",
      },
    ],
  },

  {
    id: 2,
    name: "Cafe Nusantara",
    website: "cafenusantara.com",
    progress: 45,
    stage: "Design",
    targetDate: "18 Agu 2026",
    lastUpdate: "11 Agu 2026",

    domain: "cafenusantara.com",
    jenisWebsite: "F&B / Restaurant",
    paketHosting: "Cloud Basic",
    serverLokasi: "Indonesia",
    sslValid: "Valid s.d 10 Jul 2027",
    projectManager: "Admin Appfoundry",

    latestNote: {
      date: "11 Agu 2026, 11:00",
      content: "Penyusunan wireframe menu dan halaman utama.",
      author: "Admin Appfoundry",
    },

    stagesTimeline: [],
    updatesHistory: [],
  },

  {
    id: 3,
    name: "PT ABC",
    website: "ptabc.com",
    progress: 90,
    stage: "Review",
    targetDate: "15 Agu 2026",
    lastUpdate: "10 Agu 2026",

    domain: "ptabc.com",
    jenisWebsite: "Corporate Website",
    paketHosting: "VPS Enterprise",
    serverLokasi: "Singapore",
    sslValid: "Valid s.d 01 Jan 2027",
    projectManager: "Admin Appfoundry",

    latestNote: {
      date: "10 Agu 2026, 16:20",
      content: "Menunggu feedback revisi dari client untuk halaman kontak.",
      author: "Admin Appfoundry",
    },

    stagesTimeline: [],
    updatesHistory: [],
  },
];

const selectedProject = computed(() => {
  return projects.find((project) => project.id === Number(route.params.id));
});

const goBack = () => {
  router.push("/admin/development");
};
</script>
