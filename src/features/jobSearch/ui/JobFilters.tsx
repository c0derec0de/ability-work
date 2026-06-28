import { useUnit } from 'effector-react'
import {
  $category,
  $city,
  $format,
  $search,
  categoryChanged,
  cityChanged,
  filtersReset,
  formatChanged,
  searchChanged,
} from '../model/filtersModel'

const categories = ['Все категории', 'Дизайн', 'Тексты', 'Разработка', 'Поддержка', 'Администрирование']
const formats = ['Любой формат', 'Удалённо', 'В офисе', 'Гибрид']
const cities = ['Любой город', 'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург']

export function JobFilters() {
  const [search, category, format, city] = useUnit([$search, $category, $format, $city])

  return (
    <section className="filtersPanel" aria-labelledby="filters-title">
      <h2 id="filters-title" className="visuallyHidden">Поиск и фильтры</h2>
      <div className="searchRow">
        <div className="field grow">
          <label htmlFor="job-search">Поиск по заказам</label>
          <input
            id="job-search"
            type="search"
            value={search}
            placeholder="Например, дизайн или работа с текстом"
            onChange={(event) => searchChanged(event.target.value)}
          />
        </div>
      </div>
      <div className="filterGrid">
        <div className="field">
          <label htmlFor="category-filter">Категория</label>
          <select id="category-filter" value={category} onChange={(event) => categoryChanged(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="format-filter">Формат работы</label>
          <select id="format-filter" value={format} onChange={(event) => formatChanged(event.target.value)}>
            {formats.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="city-filter">Город</label>
          <select id="city-filter" value={city} onChange={(event) => cityChanged(event.target.value)}>
            {cities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <button className="textButton resetButton" type="button" onClick={() => filtersReset()}>
          Сбросить фильтры
        </button>
      </div>
    </section>
  )
}
