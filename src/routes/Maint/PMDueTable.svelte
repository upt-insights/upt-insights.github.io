<script>
  import Table from "$lib/Table.svelte";
  import { writable } from "svelte/store";

  export let rows = [];
  export let rowDetails = [];
  export let keyName = "";

  let expandedRows = writable([]);

  const toggleRow = ({ [keyName]: k }) =>
    expandedRows.update((n) =>
      $expandedRows.includes(k) ? n.filter((i) => i !== k) : [...n, k]
    );

  const getRowDetails = (k) =>
    rowDetails
      .filter((d) => d[keyName] === k)
      .map(({ [keyName]: _, ...r }) => r);

  let keys = rows.length > 0 ? Object.keys(rows[0]) : [];
</script>

<div class="table-responsive m-0 mt-2 m-lg-4">
<table class='table table-hover table-borderless table-sm align-middle'>
  <thead>
    <tr class='table-light'>
      {#each keys as key}
        <th>{key}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows as row (row[keyName])}
      <tr on:click={(_) => toggleRow(row)}>
        {#each keys as key}
          <td>{row[key]}</td>
        {/each}
      </tr>
      {#if $expandedRows.includes(row[keyName])}
        <tr>
          <td colspan={keys.length}>
            {#each [...new Set(getRowDetails(row[keyName]).map(x=>x.unittype))] as unittype}
              <Table rows={getRowDetails(row[keyName])
                .filter(x => x.unittype === unittype)
                .sort((a, b) => b.DuePct - a.DuePct)
                .map(({ unittype, ...rest }) => rest)
              } twist={false} caption={unittype.replace(' ','')} />
            {/each}
          </td>
        </tr>
      {/if}
    {/each}
    <tr class="table-dark">
      {#each keys as key}
        <td>
          {key === keyName
            ? "Total"
            : rows.reduce((sum, row) => sum + row[key], 0)}
        </td>
      {/each}
    </tr>
  </tbody>
</table>
</div>