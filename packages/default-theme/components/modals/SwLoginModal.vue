<template>
  <div id="sw-login-modal">
    <SfModal
      class="sw-modal"
      :title="modalTitle"
      :visible="isModalOpen"
      @close="toggleModal"
    >
      <transition name="fade" mode="out-in">
        <div class="sw-login-modal__wrapper">
          <component :is="component" :key="key" @success="toggleModal" />
          <div v-if="component !== 'SwResetPassword'" class="action">
            <SwButton
              class="sf-button--text button--muted"
              @click="component = 'SwResetPassword'"
            >
              Forgotten password?
            </SwButton>
          </div>

          <div class="bottom">
            <template v-if="component !== 'SwRegister'">
              <SfHeading
                title="Don't have an account yet?"
                :level="4"
                class="bottom__heading"
              />
              <SwButton
                class="sf-button--text bottom__element"
                @click="component = 'SwRegister'"
              >
                Register today?
              </SwButton>
            </template>
          </div>
          <div v-if="component !== 'SwLogin'" class="action">
            <SwButton
              class="sf-button--text button--muted"
              @click="component = 'SwLogin'"
            >
              or try to log in again.
            </SwButton>
          </div>
        </div>
      </transition>
    </SfModal>
  </div>
</template>

<script>
import { SfHeading, SfModal, SfAlert } from "@storefront-ui/vue"
import { useUser, useUIState } from "@shopware-pwa/composables"
import SwLogin from "@shopware-pwa/default-theme/components/SwLogin"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
const SwRegister = () =>
  import("@shopware-pwa/default-theme/components/SwRegister")
const SwResetPassword = () =>
  import("@shopware-pwa/default-theme/components/SwResetPassword")

export default {
  name: "SwLoginModal",
  components: {
    SfAlert,
    SwButton,
    SfHeading,
    SfModal,
    SwLogin,
    SwRegister,
    SwResetPassword,
  },
  props: {
    onClose: {
      type: Function,
      default: undefined,
    },
    onSuccess: {
      type: Function,
      default: undefined,
    },
  },
  setup() {
    const { login, loading, error } = useUser()
    const { isOpen, switchState } = useUIState("LOGIN_MODAL_STATE")

    return {
      clientLogin: login,
      isLoading: loading,
      toggleModal: switchState,
      isModalOpen: isOpen,
      error,
    }
  },
  data() {
    return {
      key: "modal-opened",
      component: "SwLogin",
    }
  },
  computed: {
    modalTitle() {
      if (this.component === "SwRegister") {
        return "Register"
      } else if (this.component === "SwResetPassword") {
        return "Reset Password"
      }
      return "Log in"
    },
  },
  watch: {
    isModalOpen: {
      handler(oldVal, newVal) {
        if (oldVal === true) {
          // enforce rerender dynamic component
          this.key = "modal-closed"
          this.component = "SwLogin"
          return
        }
        this.key = "modal-opened"
      },
    },
  },
  methods: {
    closeHandler() {
      ;(typeof this.onClose !== "undefined" && this.onClose()) ||
        this.isModalOpen()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

#sw-login-modal {
  box-sizing: border-box;
  --overlay-z-index: 4;
  --modal-index: 4;
  @include for-desktop {
    & > * {
      --modal-width: unset;
      --modal-content-padding: var(--spacer-xl) var(--spacer-base);
    }
    ::v-deep .sf-modal__container {
      min-width: 400px;
    }
  }
}

.input-group {
  display: flex;
  width: 30vw;
  justify-content: space-between;
}

.form {
  &__input {
    margin-bottom: var(--spacer-sm);
    &--email {
      margin-bottom: var(--spacer-sm);
    }
  }
  &__checkbox {
    margin-bottom: var(--spacer-base);
  }
  &__button {
    margin-top: var(--spacer-base);
  }
}

.action {
  margin-top: var(--spacer-base);
  text-align: center;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__heading {
    --heading-title-color: var(--c-primary);
    padding: var(--spacer-sm) 0;
  }
  &:last-child {
    padding-bottom: var(--spacer-lg);
  }
}

.sf-button--muted {
  color: var(--c-text-muted);
}

.salutation {
  width: 8vw;
}
</style>
