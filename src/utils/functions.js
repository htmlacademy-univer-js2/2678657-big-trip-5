export function generateRandomDate() {
  const start = new Date();
  start.setDate(start.getDate() + Math.floor(Math.random() * 7));
  start.setHours(Math.floor(Math.random() * 24));

  const end = new Date(start);
  end.setHours(end.getHours() + Math.floor(Math.random() * 5) + 1);

  return { start, end };
}

export function formatDateTime(date) {
  if (!date) {
    return '18/03/19 12:25';
  }
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear().toString().slice(-2);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function calculateDuration(start, end) {
  const diffMs = end - start;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}D ${diffHours % 24}H ${diffMinutes % 60}M`;
  } else if (diffHours > 0) {
    return `${diffHours}H ${diffMinutes % 60}M`;
  } else {
    return `${diffMinutes}M`;
  }
}
