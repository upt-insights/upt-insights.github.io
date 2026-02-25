<script>
  import Router from "svelte-spa-router";
  import Billing from "./routes/Billing/Billing.svelte";
  import Safety from "./routes/Safety/Safety.svelte";
  import Maint from "./routes/Maint/Maint.svelte";
  const routes = {
    "/": Billing,
    "/Safety": Safety,
    "/Maint": Maint,
  };
</script>

<Router {routes} />
