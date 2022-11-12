import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class QueryParserMiddleware implements NestMiddleware {
  use(req, res, next) {
    const parsedQuery = {
      page: 0,
      limit: 10,
      paginate: true,
    };
    const query = req.query;
    const queryParserFactory = {
      page: this.parsePage,
      limit: this.parseLimit.bind(this),
      paginate: this.parsePaginate,
    };
    Object.entries(query).forEach(([key, value]) => {
      parsedQuery[key] = queryParserFactory[key]
        ? queryParserFactory[key](value)
        : value;
    });
    req.query = parsedQuery;
    next();
  }

  parsePage(value): number {
    let page = parseInt(value);
    page = page >= 0 ? page : 0;
    return page;
  }

  parsePaginate(value): boolean {
    const page = value === 'true';
    return page;
  }

  parseLimit(value): number {
    const limit = parseInt(value);
    return Math.min(20, limit);
  }
}
