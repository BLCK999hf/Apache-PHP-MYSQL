# 🚀 Servidor HTTP com Suporte a PHP e MySQL

Este projeto é um servidor HTTP desenvolvido em Node.js, capaz de servir arquivos estáticos, processar scripts PHP e integrar-se ao MySQL e phpMyAdmin. Ideal para desenvolvimento web local! 🌍

---

## 📌 Funcionalidades
✅ Servir arquivos estáticos (HTML, CSS, JS, imagens, etc.)
✅ Suporte a execução de scripts PHP via CLI
✅ Listagem automática de diretórios
✅ Integração com MySQL e phpMyAdmin
✅ Configuração simples e rápida 🚀

---

## 🛠️ Instalação e Configuração

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/BLCK999hf/Apache-PHP-MYSQL

```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Instalar PHP e MySQL

#### **Windows**:
- Baixe e instale o [PHP](https://windows.php.net/download/) e adicione ao `PATH`
- Baixe e instale o [MySQL](https://dev.mysql.com/downloads/installer/)
- Extraia o [phpMyAdmin](https://www.phpmyadmin.net/downloads/) para `www/phpmyadmin/`

#### **Linux (Debian/Ubuntu)**:
```bash
sudo apt update
sudo apt install php php-mysql mysql-server phpmyadmin -y
```

### 4️⃣ Configurar MySQL
```bash
mysql -u root -p
```
```sql
CREATE DATABASE meu_banco;
CREATE USER 'meu_usuario'@'localhost' IDENTIFIED BY 'minha_senha';
GRANT ALL PRIVILEGES ON meu_banco.* TO 'meu_usuario'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5️⃣ Iniciar o servidor
```bash
node server.js
```

Acesse no navegador: `http://localhost:8080` 🌐

---

## 🔥 Como Executar Arquivos PHP

Crie um arquivo PHP dentro do diretório `www/`:
```php
<?php
echo "Hello, PHP!";
?>
```
Acesse `http://localhost:8080/seuArquivo.php` no navegador! 🎉

---

## 🎯 Acesso ao phpMyAdmin
Após configurar o MySQL, acesse:
```
http://localhost:8080/phpmyadmin/
```
Faça login com o usuário `root` e a senha definida anteriormente.

---

## 🤝 Contribuição
Sinta-se à vontade para contribuir! Faça um fork do projeto e envie um PR. 💡✨

---

## 📜 Licença
Este projeto é distribuído sob a licença MIT. 📝

