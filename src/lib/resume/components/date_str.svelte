<script lang="ts">
	const { date }: { date: Date } = $props();
	const monthMap = new Map(
		Object.entries({
			0: 'Jan',
			1: 'Feb',
			2: 'Mar',
			3: 'Apr',
			4: 'May',
			5: 'Jun',
			6: 'Jul',
			7: 'Aug',
			8: 'Sept',
			9: 'Oct',
			10: 'Nov',
			11: 'Dec'
		})
	);
</script>

<span>{monthMap.get(date.getUTCMonth().toString())} {date.getUTCFullYear()}</span>
