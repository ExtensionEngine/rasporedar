<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getCardPrimaryText, getCardSecondaryText, timetableTransform } from '@/helpers/timetable';
import { timetableFilterLabels, timetableFilters } from '@/constants/timetableFilters';
import { getDocDefinition } from '@/helpers/pdf';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import TimeTable from '@/components/TimeTable';
import timetableService from '@/api/timetable';
import { useFormStore } from '@/stores/form';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const timetable = reactive({ data: null, loading: true, errored: false });
const filter = ref(timetableFilters.BY_CLASS);
const filteredTimetable = computed(() => {
  if (!timetable.data) return null;
  return {
    timetable: timetableTransform[filter.value](timetable.data.timetable),
    getCardPrimaryText: getCardPrimaryText[filter.value],
    getCardSecondaryText: getCardSecondaryText[filter.value],
  };
});

const monochromeMode = ref(false);
const modeButtonText = computed(() => (monochromeMode.value ? 'Color Mode' : 'Monochrome Mode'));

const formStore = useFormStore();

onMounted(() => {
  timetableService
    .getTimetable(formStore.form)
    .then(json => (timetable.data = json))
    .catch(error => {
      console.log(error);
      timetable.errored = true;
    })
    .finally(() => (timetable.loading = false));
});

function handleDownloadAll() {
  pdfMake
    .createPdf(
      getDocDefinition(
        filteredTimetable.value.timetable,
        filteredTimetable.value.getCardPrimaryText,
        filteredTimetable.value.getCardSecondaryText,
        monochromeMode.value,
      ),
    )
    .open();
}
</script>

<template>
  <div class="rsprd-container">
    <div v-if="timetable.errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </div>
    <div v-else-if="timetable.loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <header class="rsprd-toolbar">
        <div>
          <a
            v-for="filterOption in Object.keys(timetableFilters)"
            :key="filterOption"
            @click="filter = timetableFilters[filterOption]"
            :class="{ 'rsprd-toolbar__link--active': filter === timetableFilters[filterOption] }"
            class="rsprd-toolbar__link"
            >{{ timetableFilterLabels[filterOption] }}</a
          >
        </div>
        <div>
          <button
            @click="monochromeMode = !monochromeMode"
            type="button"
            class="rsprd-btn rsprd-btn--muted rsprd-btn--m"
          >
            {{ modeButtonText }}
          </button>
          <button @click="handleDownloadAll" type="button" class="rsprd-btn rsprd-btn--primary rsprd-btn--m">
            &darr; Download All
          </button>
        </div>
      </header>

      <TimeTable
        :timetable="filteredTimetable.timetable"
        :get-card-primary-text="filteredTimetable.getCardPrimaryText"
        :get-card-secondary-text="filteredTimetable.getCardSecondaryText"
        :monochrome-mode="monochromeMode"
      />
    </div>
  </div>
</template>

<style scoped>
.rsprd-toolbar {
  margin: 80px auto 24px;
  width: 70%;
}

.rsprd-toolbar__link {
  color: var(--color-darker);
  text-decoration: underline;
  cursor: pointer;
}

.rsprd-toolbar__link:hover {
  text-decoration: none;
}

.rsprd-toolbar__link:not(:last-child) {
  margin-right: 16px;
}

.rsprd-toolbar__link--active {
  text-decoration: none;
  font-weight: bold;
}

.rsprd-btn:not(:last-child) {
  margin-right: 12px;
}
</style>
