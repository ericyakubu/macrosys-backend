import { PrismaService } from '@/prisma.service';
import type { Macros } from '@/shared/types';
import { Injectable } from '@nestjs/common';
import type { RecipeProductReqDto } from './user-recipe/dto/user-recipe.dto';

@Injectable()
export class RecipeSharedService {
  constructor(private readonly prismaService: PrismaService) {}

  async exportMacros(type: 'userProduct' | 'product', items: RecipeProductReqDto[]) {
    const macros: Macros = {
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
      sugar: 0,
    };

    const idKey = type === 'userProduct' ? 'user_product_id' : 'product_id';

    const ids = items.map((i) => i[idKey]);

    const fetched =
      type === 'userProduct'
        ? await this.prismaService.userProduct.findMany({
            where: { id: { in: ids } },
            include: { diets: true },
          })
        : await this.prismaService.product.findMany({
            where: { id: { in: ids } },
            include: { diets: true },
          });

    const productMap = new Map(fetched.map((p) => [p.id, p]));
    const diets = fetched.map((p) => p.diets.map((d) => d.id)).flat();

    for (const item of items) {
      const product = productMap.get(item[idKey]);
      if (!product) continue;

      const ratio = (item.quantity ?? 0) / 100;

      macros.calories += (product.calories?.toNumber() ?? 0) * ratio;
      macros.carbohydrates += (product.carbohydrates?.toNumber() ?? 0) * ratio;
      macros.fat += (product.fat?.toNumber() ?? 0) * ratio;
      macros.fiber += (product.fiber?.toNumber() ?? 0) * ratio;
      macros.protein += (product.protein?.toNumber() ?? 0) * ratio;
      macros.sugar += (product.sugar?.toNumber() ?? 0) * ratio;
    }

    return { macros, diets };
  }
}
