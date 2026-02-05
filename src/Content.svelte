<script>
  import Router from "svelte-spa-router";
  import Billing from "./routes/Billing/Billing.svelte";
  import Safety from "./routes/Safety/Safety.svelte";
  const routes = {
    "/": Billing,
    "/Safety": Safety,
  };
</script>

<Router {routes} />
