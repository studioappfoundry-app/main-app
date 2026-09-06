<script setup>
import { ref } from "vue";

const { addToast } = useToast();
const { isDark } = useDarkMode();

import {
  Search,
  Settings,
  Heart,
  Star,
  Check,
  ArrowUpRight,
} from "~/utils/icons";

const myIcons = ref([
  { component: Search, label: "Search" },
  { component: Settings, label: "Settings" },
  { component: Heart, label: "Favorite" },
  { component: Star, label: "Star" },
  { component: Check, label: "Done" },
  { component: ArrowUpRight, label: "Open" },
]);

const isLoading = ref(false);
const checkInput = ref(false);
const isSheetOpen = ref(false);
const isModalOpen = ref(false);
const saveChanges = () => {
  alert("Changes saved!");
  isModalOpen.value = false;
};

const team = ref("");
const teamOptions = ref([
  { label: "Design Team", value: "design" },
  { label: "Engineering Team", value: "eng" },
  { label: "Marketing Team", value: "mkt" },
]);

const radioSelected = ref("standard");
const qty = ref(2);
const notifications = ref(true);
const selectedOption = ref("regular");
const selectedShipping = ref("express");

const shippingOptions = [
  {
    id: "regular",
    title: "Reguler",
    subtitle: "2-3 hari",
    price: 15000,
    status: "in",
  },
  {
    id: "express",
    title: "Express",
    subtitle: "1 hari",
    price: 30000,
    status: "low",
  },
  {
    id: "sameday",
    title: "Same Day",
    subtitle: "Hari ini",
    price: 45000,
    status: "out",
  },
];

const showDialog = ref(false);
const filter = ref("All components");

const simulateLoading = () => {
  if (isLoading.value) return;

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 1500); // simulasi loading 1.5 detik
};

const isCardSelected = ref(false);
const showToast = () => {
  addToast({
    title: "Changes saved",
    message: "Your project is up to date.",
    variant: "success",
    duration: 3000,
  });
};
const showToastError = () => {
  addToast({
    title: "Failed to save",
    message: "Check your internet connection.",
    variant: "error",
    duration: 4000, // Bisa atur durasi per toast
  });
};
const showToastInfo = () => {
  addToast({
    title: "New update available",
    message: "Click to refresh the page.",
    variant: "info",
  });
};

const navItems = [
  ["All components", "19"],
  ["Foundations", "4"],
  ["Feedback", "4"],
  ["Navigation & selection", "4"],
  ["Data display", "4"],
  ["Charts", "3"],
];

const sectionNames = [
  "Foundations",
  "Feedback",
  "Navigation & selection",
  "Data display",
  "Charts",
];

const visibleSections = computed(() =>
  sectionNames.filter(
    (name) => filter.value === "All components" || filter.value === name,
  ),
);

const barData = ref([
  { label: "Mon", value: 40 },
  { label: "Tue", value: 60 },
  { label: "Wed", value: 30 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 50 },
]);

const lineData = ref([
  { label: "Jan", value: 1000 },
  { label: "Feb", value: 1500 },
  { label: "Mar", value: 1200 },
  { label: "Apr", value: 2000 },
  { label: "May", value: 2400 },
]);

const donutData = ref([
  { label: "Completed", value: 68, color: "#00b67a" },
  { label: "Remaining", value: 32, color: "#e4e4e7" },
]);

const menuItems = ref([
  { label: "Rename workspace", action: "rename" },
  { label: "Duplicate", action: "duplicate" },
  { divider: true },
  { label: "Delete workspace", action: "delete", danger: true },
]);

const statusOptions = ref([
  "All projects",
  "In progress",
  "Completed",
  "Archived",
]);
const selectedStatus = ref("All projects");

const handleMenuSelect = (action) => {
  alert(`Selected action: ${action}`);
};
const handleDelete = () => {
  alert("Project deleted!");
};

const tableHeaders = ref([
  { key: "name", label: "Project" },
  { key: "status", label: "Status", badge: true, badgeColorKey: "statusIdx" },
]);
const tableData = ref([
  { name: "Brand refresh", status: "In progress", statusIdx: 0 },
  { name: "Mobile app", status: "Completed", statusIdx: 1 },
  { name: "Q3 campaign", status: "Review", statusIdx: 2 },
]);
const onRowSelect = (row) => console.log(row);
</script>

<template>
  <main class="gallery-shell">
    <header class="gallery-header">
      <div class="brand-mark">d<span>·</span></div>
      <div class="header-copy">
        <p class="eyebrow">Component library / 2026</p>
        <h1>Quietly powerful <em>components.</em></h1>
        <p class="hero-copy">
          A considered collection of interface building blocks for thoughtful
          products.
        </p>
      </div>
      <div class="header-meta">
        <span class="live-dot" />Live reference<br />
        <strong>v1.4.0</strong>
      </div>
    </header>

    <div class="gallery-layout">
      <aside class="sidebar">
        <p class="eyebrow">Browse</p>
        <button
          v-for="[label, count] in navItems"
          :key="label"
          :class="{ active: filter === label }"
          @click="filter = label"
        >
          <span>{{ label }}</span>
          <small>{{ count }}</small>
        </button>
        <div class="sidebar-foot">
          <span class="mint-square" />Built with intention
        </div>
      </aside>

      <div class="content">
        <div class="content-intro">
          <div>
            <p class="eyebrow">The essentials</p>
            <h2>Every state has a story.</h2>
          </div>
          <p>
            Explore components in their default, focused, selected, and empty
            states. Each one is a self-contained, reusable primitive.
          </p>
        </div>
        <!-- Foundation -->
        <section
          v-if="visibleSections.includes('Foundations')"
          class="component-section"
        >
          <div class="section-label"><span>Foundations</span><i /></div>
          <div class="component-grid">
            <!-- BUTTON SHOWCASE -->
            <DemoCard title="Button" class="relative">
              <div class="w-full flex flex-wrap gap-2">
                <Button variant="solid" size="md" @click="doSomething"
                  >Primary</Button
                >
                <Button variant="soft" size="md">Secondary</Button>
                <Button variant="primary" size="md">Secondary</Button>
                <Button variant="success" size="md">Secondary</Button>
                <Button variant="danger" size="md">Secondary</Button>
                <Button variant="info" size="md">Secondary</Button>
                <Button variant="warning" size="md">Secondary</Button>
                <Button variant="outline" size="md">Outline</Button>
                <Button variant="ghost" size="md">Ghost</Button>
              </div>
              <div class="row">
                <Button
                  variant="solid"
                  :loading="isLoading"
                  @click="simulateLoading"
                >
                  {{ isLoading ? "Saving..." : "Click to Load" }}
                </Button>
              </div>
            </DemoCard>

            <!-- BADGE SHOWCASE -->
            <DemoCard title="Input System">
              <InputSystem />
            </DemoCard>
            <!-- Checkbox and Switch -->
            <DemoCard title="Checkbox & Switch">
              <div class="flex flex-col w-full gap-2">
                <CheckboxSwitch
                  v-model="checkInput"
                  label="Send weekly summary"
                  variant="checkbox"
                />
                <CheckboxSwitch
                  v-model:switchValue="isDark"
                  switchLabel="Dark Theme"
                  variant="switch"
                  :classes="{
                    switch: 'w-full flex-row-reverse',
                  }"
                />
              </div>
            </DemoCard>
            <!-- Iconography -->
            <DemoCard title="Icon Graphy">
              <Iconography
                :icons="myIcons"
                :boxWidth="50"
                :boxHeight="50"
                :iconSize="24"
                @select="handleIconClick"
              />
            </DemoCard>
          </div>
        </section>

        <!-- Feedback -->
        <section
          v-if="visibleSections.includes('Feedback')"
          class="component-section"
        >
          <div class="section-label"><span>Feedback</span><i /></div>
          <div class="component-grid">
            <!-- Dialog -->
            <DemoCard title="Dialog">
              <Button variant="solid" @click="showDialog = true"
                >Open Modal</Button
              >
              <Dialog
                v-model="showDialog"
                variant="danger"
                eyebrow="Danger zone"
                title="Delete this project?"
                message="This action cannot be undone. All project data will be removed."
                confirmText="Delete forever"
                @confirm="handleDelete"
              />
            </DemoCard>
            <!-- <Modal /> -->
            <DemoCard title="Modal">
              <Button @click="isModalOpen = true">Open Modal</Button>
              <Modal
                v-model="isModalOpen"
                eyebrow="Confirmation"
                title="Save your changes?"
                message="Your workspace will be updated with the latest edits."
              >
                <!-- Jika ada konten tambahan di tengah -->
                <!-- <p>Slot konten custom di sini</p> -->

                <template #footer>
                  <button class="soft-btn" @click="isModalOpen = false">
                    Cancel
                  </button>
                  <button class="dark-btn" @click="saveChanges">
                    Save changes
                  </button>
                </template>
              </Modal>
            </DemoCard>
            <!-- <Toast /> -->

            <DemoCard title="Toast">
              <Button @click="showToast">Open Success</Button>
              <Button variant="outline" @click="showToastError"
                >Open Danger</Button
              >
              <Button variant="soft" @click="showToastInfo">Open Info</Button>
            </DemoCard>
            <!-- <BottomSheet /> -->

            <DemoCard title="Bottom Sheet">
              <Button @click="isSheetOpen = true">Open Bottom Sheet</Button>
              <BottomSheet
                v-model="isSheetOpen"
                eyebrow="Quick settings"
                title="Customize your workspace"
                message="Choose what appears on your overview."
              >
                <!-- Konten custom di dalam sheet -->
                <div class="dummy-content">
                  <p>
                    Ini adalah area konten Anda. Bisa diisi form, list, dsb.
                  </p>
                </div>

                <template #footer>
                  <button
                    class="dark-btn"
                    style="width: 100%"
                    @click="isSheetOpen = false"
                  >
                    Done
                  </button>
                </template>
              </BottomSheet>
            </DemoCard>
          </div>
        </section>

        <!-- Navigation -->
        <section
          v-if="visibleSections.includes('Navigation & selection')"
          class="component-section"
        >
          <div class="section-label">
            <span>Navigation & selection</span><i />
          </div>
          <div class="component-grid">
            <!-- <Datepicker /> -->
            <DemoCard title="Dropdown Menu">
              <DropdownMenu label="Open Notifications" menuMaxHeight="80vh">
                <template #trigger>
                  <div class="flex items-center gap-2 pl-2 sm:pl-3">
                    <Avatar
                      src=""
                      :alt="siteInfo?.name || ''"
                      class="bg-gradient-to-br from-orange-400 to-orange-600"
                    />
                    <div class="hidden sm:block">
                      <p
                        class="text-sm text-foreground font-medium leading-none text-gray-800"
                      >
                        {{ siteInfo?.name || "" }}
                      </p>
                      <p class="text-xs text-muted mt-1" v-if="!isAdmin">
                        {{ siteInfo?.domain || "" }}
                      </p>
                    </div>
                    <ChevronDown
                      class="hidden sm:block w-4 h-4 text-gray-400"
                    />
                  </div>
                </template>
                <template #items>
                  <NuxtLink
                    :to="linkProfil"
                    class="px-2 py-3 flex gap-3 text-muted hover:text-foreground hover:bg-primary-soft border-bottom"
                  >
                    <User class="w-5 h-5" />
                    <p>Profile</p>
                  </NuxtLink>
                  <div
                    class="p-2 py-3 flex gap-3 text-muted hover:text-foreground hover:bg-primary-soft"
                  >
                    <LogOut class="w-5 h-5" />
                    <p>Keluar</p>
                  </div>
                </template>
              </DropdownMenu>
            </DemoCard>
            <!-- <DropdownMenu /> -->
            <DemoCard title="Popover">
              <Popover
                v-model="selectedStatus"
                triggerText="Filter by"
                title="Status"
                :options="statusOptions"
              />
            </DemoCard>
            <!-- <Popover /> -->
            <DemoCard title="Select">
              <Select
                v-model="team"
                label="Team"
                :options="teamOptions"
                placeholder="Cari team..."
                searchable
              />
            </DemoCard>
          </div>
        </section>

        <!-- Data Display -->
        <section
          v-if="visibleSections.includes('Data display')"
          class="component-section"
        >
          <div class="section-label"><span>Data display</span><i /></div>
          <div class="component-grid">
            <DemoCard title="Card">
              <Card v-model:selected="isCardSelected">
                <template #icon>
                  <div class="card-art">◎</div>
                </template>
                <div>
                  <strong>Brand refresh</strong>
                  <p>Updated 2 hours ago</p>
                </div>
                <span>↗</span>
              </Card>
            </DemoCard>
            <DemoCard title="Radio Card">
              <RadioCard
                v-for="opt in [
                  { id: 'standard', title: 'Standard' },
                  { id: 'express', title: 'Express' },
                ]"
                :key="opt.id"
                :title="opt.title"
                :selected="radioSelected === opt.id"
                @select="radioSelected = opt.id"
              />
            </DemoCard>
            <DemoCard title="Quantity Card">
              <QuantityCard
                title="Jumlah Tiket"
                subtitle="Maksimal 10 tiket"
                v-model="qty"
                :min="1"
                :max="10"
              />
            </DemoCard>
            <DemoCard title="Toggle Card">
              <ToggleCard
                title="Notifikasi Email"
                subtitle="Terima update via email"
                v-model="notifications"
              />
            </DemoCard>
            <DemoCard title="Option Card (Default)">
              <OptionCard
                title="Paket Bulanan"
                subtitle="Rp 99.000/bulan"
                :selected="selectedOption === 'regular'"
                @select="selectedOption = 'regular'"
              />
            </DemoCard>
            <DemoCard class="relative" title="Option Card">
              <div class="w-full flex flex-wrap gap-2">
                <OptionCard
                  v-for="ship in shippingOptions"
                  :key="ship.id"
                  variant="availability"
                  :title="ship.title"
                  :subtitle="ship.subtitle"
                  :price="ship.price"
                  :status="ship.status"
                  :selected="selectedShipping === ship.id"
                  @select="selectedShipping = ship.id"
                />
              </div>
            </DemoCard>
            <DemoCard title="Table">
              <Table
                :headers="tableHeaders"
                :data="tableData"
                @select="onRowSelect"
              />
            </DemoCard>
            <DemoCard title="Avatar">
              <div class="row" style="align-items: center">
                <!-- Avatar dengan Image -->
                <Avatar
                  src="https://i.pravatar.cc/100?img=1"
                  alt="John Doe"
                  size="lg"
                  status="online"
                />

                <!-- Avatar Stacked dengan Initials -->
                <div style="display: flex">
                  <Avatar alt="Alice Mint" variant="mint" stacked />
                  <Avatar
                    alt="John Peach"
                    variant="peach"
                    stacked
                    status="busy"
                  />
                  <Avatar alt="Robert K" variant="lilac" stacked />
                  <Avatar alt="Dark Lord" variant="dark" stacked />
                </div>

                <span class="muted-text">4 members</span>
              </div>
            </DemoCard>
            <DemoCard title="Badge">
              <div class="row">
                <Badge variant="success" dot>Success</Badge>
                <Badge variant="warning" dot>Review</Badge>
                <Badge variant="danger" dot>Blocked</Badge>
                <Badge variant="neutral">Draft</Badge>
              </div>
            </DemoCard>
          </div>
        </section>

        <!-- Chart -->
        <section
          v-if="visibleSections.includes('Charts')"
          class="component-section"
        >
          <div class="flex">
            <DemoCard title="Bar Chart">
              <BarChart
                title="Tasks Completed"
                :value="1284"
                growth="+12.8%"
                :data="barData"
                color="#00b67a"
              />
            </DemoCard>
            <DemoCard title="Line Chart">
              <LineChart
                title="Monthly Active Users"
                :value="24680"
                growth="+18.4%"
                :data="lineData"
                color="#3b82f6"
              />
            </DemoCard>
            <DemoCard title="Donut Chart">
              <DonutChart :segments="donutData" />
            </DemoCard>
            <DemoCard title="Progress Chart Bar">
              <div class="flex flex-col">
                <!-- Basic Progress -->
                <ProgressBar label="Penyimpanan Cloud" :value="65" />

                <!-- Progress with Max Value (Fractional) -->
                <ProgressBar
                  label="Langkah Selesai"
                  :value="4"
                  :max="5"
                  variant="success"
                />

                <!-- Striped Animated Warning -->
                <ProgressBar
                  label="Kapasitas Server"
                  :value="85"
                  variant="warning"
                  striped
                />

                <!-- Loading State (Indeterminate) -->
                <ProgressBar
                  label="Mengunggah File..."
                  variant="primary"
                  :indeterminate="true"
                  size="lg"
                />

                <!-- Small Danger Progress -->
                <ProgressBar
                  :value="95"
                  variant="danger"
                  size="sm"
                  :show-value="false"
                />
              </div>
            </DemoCard>
          </div>
        </section>
      </div>
    </div>

    <footer class="gallery-footer">
      <span>Durable-inspired component reference</span>
      <span>19 components · 5 categories</span>
    </footer>
  </main>
</template>
