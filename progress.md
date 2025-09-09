# Журнал выполнения работ (v2.0)

## Общая информация

- **ТЗ**: версия 2.0
- **Backend**: Strapi v4
- **Frontend**: Next.js (TypeScript)
- **База данных**: PostgreSQL
- **Развертывание**: Docker

## Завершенные этапы:

* [ ] Этап 1: Подготовка проекта и Strapi
* [ ] Этап 2: Настройка БД и иерархии
* [x] Этап 3: Frontend базовая структура
* [ ] Этап 4: Интеграция API и меню
* [ ] Этап 5: Поиск и функционал
* [ ] Этап 6: Печать и PDF
* [ ] Этап 7: Адаптивность и стили
* [ ] Этап 8: Docker и развертывание

## Текущие задачи:

- **Дата**: 2024-07-25
- **Этап**: 4
- **Текущая задача**: Интеграция API и меню. Создан API-клиент (`lib/strapi.ts`) и компонент `TreeMenu` для отображения иерархии категорий с ленивой загрузкой.
- **Статус**: started
- **Коммиты**: -

---
## Завершенные задачи:
- **Дата**: 2024-07-25
- **Этап**: 3
- **Текущая задача**: Frontend базовая структура. Создана структура директорий, базовые компоненты Layout (Header, Footer, Sidebar, Content) и главная страница.
- **Статус**: completed
- **Коммиты**: 168db7b

## Техническое задание (v2.0)

### 1. Backend (Strapi)

- **Content Types**:
  - `Category`:
    - `title` (string, required)
    - `slug` (uid, from title, required)
    - `parent` (relation, self, one-to-many)
    - `children` (relation, self, many-to-one)
    - `isRoot` (boolean, default false)
  - `Page`:
    - `title` (string, required)
    - `slug` (uid, from title, required)
    - `content` (richtext)
    - `category` (relation, many-to-one with Category)
  - `News`:
    - `title` (string, required)
    - `slug` (uid, from title, required)
    - `content` (richtext)
    - `publishedDate` (datetime, required)
  - `Media`/`Document`:
    - Использовать встроенный `Media Library`.
    - Связывать с `Page` и `News` через `media` поле.

- **API**:
  - CRUD по умолчанию для всех типов.
  - Кастомный endpoint `/api/search?q=...` для поиска по `Page`, `News`, `Category`.
  - Endpoint для PDF: `/api/pages/:id/pdf` (puppeteer).

- **Seed**:
  - Скрипт для заполнения тестовыми данными (JSON).

### 2. База данных

- **PostgreSQL** в production.
- SQLite или Postgres в development.
- Все ключи и пароли — в `.env`.

### 3. Frontend (Next.js)

**3.1. Основные страницы**

* `/` — главная, список категорий и новостей.
* `/[category]/[slug]` — страница с контентом.
* `/news/[slug]` — новости.
* `/search` — поиск.

**3.2. Компоненты**

* Навигационное меню (дерево категорий, lazy loading).
* Хлебные крошки (из parent).
* Редактор текста: старт с react-quill, с возможностью перехода на tiptap.
* Генерация PDF:

  * Клиент: pdfmake (быстрое скачивание).
  * Сервер (API route): puppeteer (рендер с CSS).

**3.3. SEO**

* Next.js Head + динамические мета-теги.
* Sitemap (автогенерация из категорий/страниц).

### 4. Инфраструктура

**4.1. Docker**

* `docker-compose.yml` — основа.
* `docker-compose.override.yml` — dev: volumes, hot reload.
* `docker-compose.prod.yml` — prod: чистые контейнеры.

**4.2. Nginx**

* Внешний Nginx (reverse proxy, SSL).
* Внутренний (раздача фронта).

### 5. GitHub + CI/CD

- Регулярные коммиты с понятными сообщениями.
- `.gitignore` для всех сборок, логов и `node_modules`.
- Секреты хранятся в CI/CD, не в репозитории.
