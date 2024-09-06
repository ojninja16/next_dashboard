from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
import random
def generate_date_range(start_date, num_days):
    return [start_date + timedelta(days=i) for i in range(num_days)]
@api_view(['GET'])
def candlestick_data(request):
    try:
        start_date = datetime(2023, 1, 1)
        dates = generate_date_range(start_date, 30)
    
        data = {
        "data": [
            {
                "x": date.strftime("%Y-%m-%d"),
                "open": round(random.uniform(100, 150), 2),
                "high": round(random.uniform(150, 200), 2),
                "low": round(random.uniform(50, 100), 2),
                "close": round(random.uniform(100, 150), 2)
            } for date in dates
            ]
        }

        return Response(data,status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['GET'])
def line_chart_data(request):
    try:
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        data = {
        "labels": months,
        "datasets": [
            {
                "label": "Sales 2022",
                "data": [random.randint(5000, 15000) for _ in range(12)]
            },
            {
                "label": "Sales 2023",
                "data": [random.randint(7000, 20000) for _ in range(12)]
            }
            ]
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def bar_chart_data(request):
    try:
        products = ["Laptop", "Smartphone", "Tablet", "Smartwatch", "Headphones"]
        data = {
        "labels": products,
        "datasets": [
            {
                "label": "Units Sold",
                "data": [random.randint(1000, 5000) for _ in range(len(products))]
            },
            {
                "label": "Revenue ($)",
                "data": [random.randint(50000, 200000) for _ in range(len(products))]
            }
            ]
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def pie_chart_data(request):
    try:
        categories = ["Electronics", "Clothing", "Food & Beverages", "Books", "Home & Garden"]
        data = {
        "labels": categories,
        "datasets": [{
            "data": [random.randint(1000, 10000) for _ in range(len(categories))],
            "backgroundColor": [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
            ]
            }]
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
