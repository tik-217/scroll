<script setup lang="ts">
// vue
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';

// antd
import { LoadingOutlined } from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';

// api
import getUsers from '@/services/api';

// types
import { IUsersResults } from '@/types';

const loading = ref(true);
const allUsers = ref<IUsersResults[]>([]);
const page = ref(1);
const observable = ref();
const lastListElem = ref(null);

const emit = defineEmits(['intersect']);

async function initGetUsers() {
  allUsers.value = await getUsers(page.value);
  loading.value = allUsers.value && false;
}

onMounted(() => {
  const options = {
    rootMargin: '800px'
  };

  observable.value = new IntersectionObserver(([entry]) => {
    if (loading.value) return;
    if (entry && entry.isIntersecting) {
      emit('intersect');
      page.value++;
    }
  }, options);

  observable.value.observe(lastListElem.value);

  initGetUsers();
});

onUnmounted(() => {
  observable.value.disconnect();
});

watch(page, async (newPage) => {
  const users = await getUsers(newPage);
  allUsers.value = [...allUsers.value, ...users];
});
</script>

<template>
  <div>
    <template v-if="loading">
      <div class="cards__spiner">
        <loading-outlined />
      </div>
    </template>

    <div class="cards">
      <template v-for="(user, i) in allUsers" :key="i">
        <a-card>
          <template #actions>
            <setting-outlined />
            <edit-outlined />
            <ellipsis-outlined />
          </template>
          <a-card-meta :title="user.name.first" :description="user.email">
            <template #avatar>
              <a-avatar :src="user.picture.thumbnail" />
            </template>
          </a-card-meta>
        </a-card>
      </template>
      <div ref="lastListElem"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards > div {
  margin: 10px auto 15px;
}

.cards__spiner {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.ant-card {
  background: aliceblue;
  max-width: 300px;
  border-radius: 10px;
  .ant-card-actions {
    border-radius: 10px !important;
  }
}
</style>
