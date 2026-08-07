# 数据库结构草图

第一期页面使用本地静态数据；当内容稳定后，可迁移到 PostgreSQL / Supabase。以下结构避免了“作品、人物、主题、档案”之间的信息孤岛。

## 内容实体

| 表 | 关键字段 | 用途 |
| --- | --- | --- |
| `works` | `id`, `slug`, `title`, `published_year`, `summary`, `cover_asset_id` | 小说、短篇、随笔等作品 |
| `people` | `id`, `name`, `role`, `born_year`, `died_year`, `biography` | 作家本人、家人、同时代人、虚构人物 |
| `timeline_events` | `id`, `event_date`, `title`, `description`, `place_id`, `importance` | 生平、创作、出版与历史事件 |
| `places` | `id`, `name`, `city`, `latitude`, `longitude`, `description` | 圣彼得堡、流放地、居所等地理档案 |
| `themes` | `id`, `slug`, `name`, `description` | 罪、自由、贫困、信仰、地下室等主题 |
| `archive_items` | `id`, `title`, `type`, `asset_url`, `source`, `date_created`, `rights_note` | 手稿、书信、肖像、首版封面、地图 |
| `quotes` | `id`, `text`, `source_work_id`, `speaker`, `translator`, `context` | 引语及其出处、译者、语境 |

## 连接表

| 表 | 关键字段 | 作用 |
| --- | --- | --- |
| `work_themes` | `work_id`, `theme_id`, `weight` | 一部作品可连向多个思想主题 |
| `work_people` | `work_id`, `person_id`, `relation` | 作者、译者或虚构人物与作品的关系 |
| `archive_work_links` | `archive_item_id`, `work_id`, `note` | 手稿、照片对应到具体作品 |
| `event_work_links` | `timeline_event_id`, `work_id` | 生平事件与创作/出版关系 |

## 设计原则

- 所有影像资产保留来源与权利说明，避免档案网站最常见的版权遗漏。
- 引语必须保留译者与语境，避免脱离原文的“名言墙”。
- 使用连接表，使同一主题可在多部作品、档案和时间事件之间被重新发现。
