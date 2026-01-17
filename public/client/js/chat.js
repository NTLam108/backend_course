// Logic đóng mở
document.getElementById('chat-circle').onclick = () => {
    const win = document.getElementById('chat-window');
    win.style.display = win.style.display === 'none' ? 'flex' : 'none';
};

// Logic gửi tin
document.getElementById('chat-send').onclick = async () => {
    const input = document.getElementById('chat-input');
    const logs = document.getElementById('chat-logs');
    const message = input.value;
    if (!message) return;

    logs.innerHTML += `<div style="align-self: flex-end; background: #e3f2fd; padding: 5px 10px; border-radius: 8px;">${message}</div>`;
    input.value = '';

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    const data = await res.json();
    logs.innerHTML += `<div style="align-self: flex-start; background: #f5f5f5; padding: 5px 10px; border-radius: 8px;">${data.reply}</div>`;
    logs.scrollTop = logs.scrollHeight;
};