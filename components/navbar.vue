<template>
    <div>
        <b-navbar type="dark" variant="dark" toggleable>
            <div class="container">
                <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_dropdown_collapse">
                    <b-navbar-nav class="ml-auto">
                        <template v-if="authenticated">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/">Kerjaan</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/profile">profile</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click.prevent="signOut">Logout</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
                            </li>
                        </template>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        signOut() {
            this.$auth.logout();
            this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/login');
        }
    }
}
</script>
<style scoped>
    .navbar{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
</style>
